#!/usr/bin/env node

import { readFile, writeFile } from 'fs/promises';
import fetch from 'node-fetch/lib/index.mjs'; // eslint-disable-line
import { minify } from 'html-minifier'; // eslint-disable-line
import rimraf from 'rimraf'; // eslint-disable-line

const HTML_PATH = 'dist/index.html';
const APP_PATH = 'dist/src/app.js';
const FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Bitter:wght@400;700&family=Space+Mono&display=swap';

async function run() {
  const html = (await readFile(HTML_PATH)).toString();
  const app = (await readFile(APP_PATH)).toString();
  const fonts = await (await fetch(FONTS_URL)).text();

  const inlinedHtml = html
    .replace(
      `<link
      href="https://fonts.googleapis.com/css2?family=Bitter:wght@400;700&family=Space+Mono&display=swap"
      rel="stylesheet"
    />`,
      `<style>${fonts}</style>`,
    )
    .replace(
      '<script src="src/app.js" type="module"></script>',
      `<script type="module">${app}</script>`,
    );

  const minified = minify(inlinedHtml, {
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

  rimraf.sync('dist/src');
}

run();
