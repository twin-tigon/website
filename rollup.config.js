import { skypackResolver } from '@vinicius73/rollup-plugin-skypack-resolver';
import { terser } from 'rollup-plugin-terser';
import { copy } from '@web/rollup-plugin-copy';

import { writeFile } from 'fs';
import { promisify } from 'util';

const write = promisify(writeFile);

export default {
  input: 'src/app.js',
  output: {
    dir: 'dist',
    format: 'es',
  },
  plugins: [
    skypackResolver({ modules: ['lit'] }),
    terser(),
    copy({ patterns: ['**/*.{jpg,png,ico,webmanifest}', '*.{html,svg}'] }),
    {
      name: 'index-replace',
      async writeBundle(options, bundle) {
        const { fileName, source } = bundle['index.html'];
        const content = source.toString();
        const newContent = content.replace('./src/app.js', './app.js');
        await write(`${process.cwd()}/${options.dir}/${fileName}`, newContent);
      },
    },
  ],
};
