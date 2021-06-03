#!/usr/bin/env node

import { readFile } from 'fs/promises';
import { build as esBuild } from 'esbuild'; // eslint-disable-line
import { skypackResolver } from 'esbuild-skypack-resolver'; // eslint-disable-line
import { minifyHTMLLiterals } from 'minify-html-literals'; // eslint-disable-line

const JS_FILES_REGEX = /\.js$/;

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

  esBuild({
    entryPoints: ['src/app.js'],
    outfile: 'dist/src/app.js',
    format: 'esm',
    bundle: true,
    minify: true,
    plugins: [skypackResolver(), minifyHtmlLiterals],
  }).catch(() => process.exit(1));
}

run();
