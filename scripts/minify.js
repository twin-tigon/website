#!/usr/bin/env node

import { readFile, writeFile } from 'fs/promises';
import { minify } from 'html-minifier';

const HTML_PATH = 'dist/index.html';

async function run() {
  const html = (await readFile(HTML_PATH)).toString();

  const minified = minify(html, {
    collapseWhitespace: true,
    removeComments: true,
    removeOptionalTags: true,
    removeRedundantAttributes: true,
    removeTagWhitespace: true,
    useShortDoctype: true,
    minifyCSS: true,
    minifyJS: true,
  });

  await writeFile(HTML_PATH, minified);
}

run();
