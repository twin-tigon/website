#!/usr/bin/env node

import { build as esBuild } from 'esbuild'; // eslint-disable-line
import { readFile } from 'fs/promises';

const PACKAGE_ID_REGEX = /^@?(([a-z0-9]+-?)+\/?)+$/;
const CDN_HOST = 'https://jspm.dev';

async function run() {
  const { dependencies: allDependencies } = JSON.parse(
    (await readFile(`${process.cwd()}/package-lock.json`)).toString(),
  );
  const dependencies = Object.fromEntries(
    Object.entries(allDependencies).filter(([, props]) => !props.dev),
  );

  const jspmResolver = {
    name: 'jspm-resolver',
    setup(build) {
      build.onResolve({ filter: PACKAGE_ID_REGEX }, ({ path }) => {
        const { version } = dependencies[path];
        const url = `${CDN_HOST}/${path}@${version}`;
        return { path: url, external: true };
      });
    },
  };

  esBuild({
    entryPoints: ['src/app.js'],
    outfile: 'dist/src/app.js',
    format: 'esm',
    bundle: true,
    minify: true,
    plugins: [jspmResolver],
  }).catch(() => process.exit(1));
}

run();
