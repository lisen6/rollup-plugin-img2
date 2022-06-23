import buble from '@rollup/plugin-buble'

import pkg from './package.json'

export default {
  input: 'src/index.ts',
  external: [...Object.keys(pkg.dependencies), 'fs', 'path'],
  output: [
    { file: pkg.main, format: 'cjs', sourcemap: true, exports: 'auto' },
    { file: pkg.module, format: 'es', sourcemap: true }
  ],
  plugins: [buble()]
}
