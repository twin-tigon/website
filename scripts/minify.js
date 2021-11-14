#!/usr/bin/env node

import { readFile, writeFile } from 'fs/promises';
import { minify } from 'html-minifier'; // eslint-disable-line
import rimraf from 'rimraf'; // eslint-disable-line

const HTML_PATH = 'dist/index.html';
const APP_PATH = 'dist/src/app.js';

async function run() {
  const html = (await readFile(HTML_PATH)).toString();
  const app = (await readFile(APP_PATH)).toString();

  const minified = minify(html, {
    collapseWhitespace: true,
    removeComments: true,
    removeOptionalTags: true,
    removeRedundantAttributes: true,
    removeTagWhitespace: true,
    useShortDoctype: true,
    minifyCSS: true,
    minifyJS: true,
  }).replace(
    '<script src="src/app.js"type="module"></script>',
    `<script type="module">${app}</script>`,
  );

  await writeFile(HTML_PATH, minified);

  rimraf.sync('dist/src');
}

run();
