# rollup-plugin-img

Import image files with rollup. Let you import images just like what you do with webpack in your React code!

## Requirements

This plugin requires an [LTS](https://github.com/nodejs/Release) Node version (v8.0.0+) and Rollup v1.20.0+.

## Install

    yarn add --dev rollup-plugin-img2

or

    npm install -D rollup-plugin-img2

or

    pnpm install -D rollup-plugin-img2

## Usage

In the rollup.config.js:

```JavaScript
import image from 'rollup-plugin-img2';

export default {
  entry: 'src/index.js',
  dest: 'dist/bundle.js',
  plugins: [
    image({
      output: 'dist/images'
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

demo:

```JavaScript
  ...
  image({
    output: `${distPath}/images`, // default the root
    limit: 8192,  // default 8192(8k)
    hash: true,
    exclude: 'node_modules/**'
  })
  ...
```

## License

MIT
