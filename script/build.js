#!/usr/bin/env node

import { readFile, writeFile } from 'fs/promises';
import { build as esBuild } from 'esbuild'; // eslint-disable-line
import { skypackResolver } from 'esbuild-skypack-resolver'; // eslint-disable-line
import { minifyHTMLLiterals } from 'minify-html-literals'; // eslint-disable-line
import { init, parse } from 'es-module-lexer'; // eslint-disable-line
import fetch from 'node-fetch/lib/index.mjs'; // eslint-disable-line

const JS_FILES_REGEX = /\.js$/;
const CDN_URL = 'https://cdn.skypack.dev';

async function run() {
  const minifyHtmlLiterals = {
    name: 'minify-html-literals',
    setup(build) {
      build.onLoad({ filter: JS_FILES_REGEX }, async ({ path }) => {
        const content = (await readFile(path)).toString();
        const result = minifyHTMLLiterals(content, {
          fileName: path,
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
      setup(build) {
        build.onEnd(async () => {
          const outfile = (await readFile(build.initialOptions.outfile)).toString();
          const [fileImports] = parse(outfile);

          const unique = (element, index, array) => array.indexOf(element) === index;
          const imports = fileImports.map(({ n }) => n).filter(unique);

          const deepImports = (
            await Promise.all(
              imports.map(async id => {
                const sourceCode = await (await fetch(id)).text();
                const [relativeImports] = parse(sourceCode);
                const absoluteImports = relativeImports.map(({ n }) => `${CDN_URL}${n}`);

                return absoluteImports;
              }),
            )
          )
            .flat()
            .filter(unique);
          // TODO: filter also fileImports

          writeFile(
            build.initialOptions.outfile,
            `${outfile}${deepImports.map(id => `import"${id}"`).join(';')}`,
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
    plugins: [false && minifyHtmlLiterals, skypackResolver(), await preloadDeepImports()].filter(
      Boolean,
    ),
  }).catch(() => process.exit(1));
}

run();
