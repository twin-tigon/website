#!/usr/bin/env node

import { build as esBuild } from 'esbuild'; // eslint-disable-line
import { readFile } from 'fs/promises';
import fetch from 'node-fetch'; // eslint-disable-line

const PACKAGE_ID_REGEX = /^@?(([a-z0-9]+-?)+\/?)+$/;
const CDN_HOST = 'https://cdn.skypack.dev';

async function run() {
  const { dependencies: allDependencies } = JSON.parse(
    (await readFile(`${process.cwd()}/package-lock.json`)).toString(),
  );
  const dependencies = Object.fromEntries(
    Object.entries(allDependencies).filter(([, props]) => !props.dev),
  );

  const skypackResolver = {
    name: 'skypack-resolver',
    setup(build) {
      build.onResolve({ filter: PACKAGE_ID_REGEX }, async ({ path }) => {
        const { version } = dependencies[path];
        const body = await (await fetch(`${CDN_HOST}/${path}@${version}`)).text();
        const [, url] = body.match(/Minified: (.+)/m);

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
    plugins: [skypackResolver],
  }).catch(() => process.exit(1));
}

run();
