#!/usr/bin/env node

import globby from 'globby'; // eslint-disable-line
import { readFile, writeFile } from 'fs/promises';
import { minify } from 'html-minifier'; // eslint-disable-line

const PATTERNS = ['index.html'];
const OUTPUT_DIR = 'dist';

async function run() {
  const cwd = `${process.cwd()}/${OUTPUT_DIR}`;
  const paths = await globby(PATTERNS, { cwd });

  await Promise.all(
    paths.map(async path => {
      const outPath = `${cwd}/${path}`;
      const content = (await readFile(outPath)).toString();
      const minified = minify(content, {
        collapseWhitespace: true,
        removeComments: true,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        removeTagWhitespace: true,
        useShortDoctype: true,
        minifyCSS: true,
        minifyJS: true,
      });
      await writeFile(outPath, minified);
    }),
  );
}

run();
