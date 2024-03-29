# rollup-plugin-img2

Import image files with rollup. Let you import images just like what you do with webpack in your React code!

## Install

    yarn add -D rollup-plugin-img2

or

    npm install -D rollup-plugin-img2

or

    pnpm install -D rollup-plugin-img2

## Usage

In the rollup.config.js:

```JavaScript
import image from 'rollup-plugin-img2';

export default {
  input: 'src/index.js',
  output: 'dist/bundle.js',
  plugins: [
    image({
      output: 'dist/images',
      hash: true,
      limit: 10000
    })
  ]
};
```

and in your React code:

```JavaScript
import img from 'path/image.png';

  ...
  render() {
    return <img src={ img } />;
  }
  ...
```

## Options

You can pass an option to the `image()` just like above, and there are some options:

- exclude & include: Optional. like other rollup plugins. [Details](https://github.com/rollup/rollup/wiki/Plugins)
- output: Required. the dest path of output image files. The first directory of dest will be handled as the base output directory(where the html file will be, usually).
- limit: Optional. the limit(byte) of the file size. A file will be transformed into base64 string when it doesn't exceeded the limit, otherwise, it will be copyed to the dest path.
- hash: Optional. a boolean value to indicate wheather to generate a hash string in file name(default false).
- dom: Optional. Do not return a URL of the data protocol. Returns rendered image elements

## License

MIT
