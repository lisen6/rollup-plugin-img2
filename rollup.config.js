import buble from '@rollup/plugin-buble'
import ts from 'rollup-plugin-typescript2'
import path from 'path'
import pkg from './package.json'

export default {
  input: 'src/index.ts',
  external: [...Object.keys(pkg.dependencies), 'fs', 'path'],
  output: [
    { file: pkg.main, format: 'cjs', sourcemap: true, exports: 'auto' },
    { file: pkg.module, format: 'es', sourcemap: true }
  ],
  plugins: [
    ts({
      tsconfig: path.resolve(__dirname, 'tsconfig.json')
    }),
    buble()
  ]
}
