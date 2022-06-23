import html from '@rollup/plugin-html'
import image from '../src/index'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle-[hash].js',
    format: 'iife'
  },
  plugins: [
    image({
      output: 'dist/images',
      hash: true,
      limit: 2048,
      _slash: true
    }),
    html()
  ]
}
