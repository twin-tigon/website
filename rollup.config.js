import html from '@web/rollup-plugin-html';
import { terser } from 'rollup-plugin-terser';
import { copy } from '@web/rollup-plugin-copy';

import { dependencies } from './package-lock.json';

const CDN_HOST = 'https://jspm.dev';

function jspmResolver() {
  return {
    name: 'jspm-resolver',
    async resolveId(id) {
      if (id in dependencies) {
        const { version } = dependencies[id];
        return {
          id: `${CDN_HOST}/${id}@${version}`,
          external: true,
        };
      }
      return null;
    },
  };
}

export default {
  plugins: [
    html({
      input: 'index.html',
    }),
    jspmResolver(),
    terser({
      ecma: 2020,
      module: true,
      warnings: true,
    }),
    copy({ patterns: ['img/**/*', '404.html'] }),
  ],
  output: {
    dir: 'dist',
  },
};
