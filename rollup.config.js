import html from '@web/rollup-plugin-html';
import { skypackResolver } from '@vinicius73/rollup-plugin-skypack-resolver';
import { terser } from 'rollup-plugin-terser';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import { copy } from '@web/rollup-plugin-copy';

export default {
  plugins: [
    html({
      input: 'index.html',
    }),
    skypackResolver({ modules: ['lit'] }),
    minifyHTML(),
    terser({
      ecma: 2020,
      module: true,
      warnings: true,
    }),
    copy({ patterns: ['**/*.{jpg,png,ico,webmanifest}', '*.svg', '404.html'] }),
  ],
  output: {
    dir: 'dist',
  },
};
