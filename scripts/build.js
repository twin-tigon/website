#!/usr/bin/env node

import { readFile, writeFile } from 'fs/promises';
import { build as esBuild } from 'esbuild';
import { skypackResolver } from 'esbuild-skypack-resolver';
import { minifyHTMLLiterals, defaultMinifyOptions } from 'minify-html-literals';
import { init, parse } from 'es-module-lexer';
import fetch from 'node-fetch';

const JS_FILES_REGEX = /\.js$/;
const CDN_URL = 'https://cdn.skypack.dev';

async function run() {
  const minifyHtmlLiterals = {
    name: 'minify-html-literals',
    /**
     * @param { import("esbuild").PluginBuild } build
     */
    setup(build) {
      build.onLoad({ filter: JS_FILES_REGEX }, async ({ path }) => {
        const content = (await readFile(path)).toString();
        const result = minifyHTMLLiterals(content, {
          fileName: path,
          minifyOptions: {
            ...defaultMinifyOptions,
            collapseWhitespace: true,
            conservativeCollapse: true,
          },
          shouldMinifyCSS: template => template.tag === 'css',
        });

        return {
          contents: result ? result.code : content,
          loader: 'js',
        };
      });
    },
  };

  async function preloadDeepImports() {
    await init;

    return {
      name: 'preload-deep-imports',
      /**
       * @param { import("esbuild").PluginBuild } build
       */
      setup(build) {
        build.onEnd(async () => {
          if (!build.initialOptions.outfile) {
            return;
          }

          const outfile = (await readFile(build.initialOptions.outfile)).toString();
          const [fileImports] = parse(outfile);

          /**
           *
           * @param {string | undefined} element
           * @param {number} index
           * @param {(string | undefined)[]} array
           * @returns
           */
          const unique = (element, index, array) => array.indexOf(element) === index;
          const imports = fileImports.map(({ n }) => n).filter(unique);

          const deepImports = (
            await Promise.all(
              imports.map(async id => {
                if (!id) {
                  return [];
                }

                const sourceCode = await (await fetch(id)).text();
                const [relativeImports] = parse(sourceCode);
                const absoluteImports = relativeImports.map(({ n }) => `${CDN_URL}${n}`);

                return absoluteImports;
              }),
            )
          )
            .flat()
            .filter(unique);

          writeFile(
            build.initialOptions.outfile,
            `${outfile};${deepImports.map(id => `import"${id}"`).join(';')};`,
          );
        });
      },
    };
  }

  esBuild({
    entryPoints: ['src/app.js'],
    outfile: 'dist/src/app.js',
    format: 'esm',
    bundle: true,
    minify: true,
    plugins: [minifyHtmlLiterals, skypackResolver(), await preloadDeepImports()],
  }).catch(() => process.exit(1));
}

run();
