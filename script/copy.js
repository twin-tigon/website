#!/usr/bin/env node

import globby from 'globby'; // eslint-disable-line
import { dirname } from 'path';
import { copyFile, mkdir } from 'fs/promises';

const PATTERNS = ['img/**/*', '*.html'];
const OUTPUT_DIR = 'dist';

async function run() {
  const paths = await globby(PATTERNS);
  await Promise.all(
    paths.map(async path => {
      const outPath = `${process.cwd()}/${OUTPUT_DIR}/${path}`;
      const outDir = dirname(outPath);
      mkdir(outDir, { recursive: true });
      copyFile(path, outPath);
    }),
  );
}

run();
