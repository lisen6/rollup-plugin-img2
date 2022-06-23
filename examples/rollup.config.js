import html from '@rollup/plugin-html'
import image from 'rollup-plugin-img2'

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
      limit: 1024 * 10,
      _slash: true
    }),
    html()
  ]
}
