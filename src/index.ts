import {
  readFileSync,
  createReadStream,
  createWriteStream,
  existsSync,
  statSync,
  mkdirSync
} from 'fs'
import { extname, relative, basename, sep } from 'path'
import { createFilter, FilterPattern } from '@rollup/pluginutils'
import { Plugin } from 'rollup'
import svgToMiniDataURI from 'mini-svg-data-uri'
import hasha from 'hasha'

export interface RollupImageOptions {
  output?: string
  include?: FilterPattern
  exclude?: FilterPattern
  dom?: boolean
  hash?: boolean
  limit?: number
  _slash?: boolean
}

export interface GetDataURIProps {
  format: string
  isSvg: boolean
  mime: string
  source: string
}

export interface MineTypeProps {
  [x: string]: string
}

const defaults: RollupImageOptions = {
  output: '',
  dom: false,
  hash: false,
  _slash: false,
  exclude: null,
  include: null
}

const mimeTypes: MineTypeProps = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp'
}

const domTemplate = ({ dataUri }: { dataUri: string }) => `
    var img = new Image();
    img.src = "${dataUri}";
    export default img;
  `

const constTemplate = ({ dataUri }: { dataUri: string }) => `
    var img = "${dataUri}";
    export default img;
  `

const getDataUri = ({ format, isSvg, mime, source }: GetDataURIProps) =>
  isSvg ? svgToMiniDataURI(source) : `data:${mime};${format},${source}`

export default function image(opts: RollupImageOptions = {}): Plugin {
  const options: RollupImageOptions = Object.assign({}, defaults, opts)
  const filter = createFilter(options.include, options.exclude)

  return {
    name: 'image',

    load(this: any, id: string) {
      if (!options.output) {
        this.warn(
          'plugin-image: please configure the resource output directory '
        )
        return null
      }

      if (!filter(id)) {
        return null
      }

      const mime = mimeTypes[extname(id)]
      if (!mime) {
        // not an image
        return null
      }

      const ext = extname(id)
      const isSvg = mime === mimeTypes['.svg']
      const format = isSvg ? 'utf-8' : 'base64'
      const source = readFileSync(id, format).replace(/[\r\n]+/gm, '')

      if (statSync(id).size < (options.limit || 8192)) {
        const dataUri = getDataUri({ format, isSvg, mime, source })
        const code = options.dom
          ? domTemplate({ dataUri })
          : constTemplate({ dataUri })

        return code.trim()
      } else {
        const output = relative('./', options.output) || ''

        if (!existsSync(output)) {
          const dirs = output.split(sep)
          for (
            let i = 0, dir = dirs[0];
            i < dirs.length;
            i++, dir += `${sep}${dirs[i]}`
          ) {
            if (dir !== '' && !existsSync(dir)) {
              mkdirSync(dir)
            }
          }
        }

        let name = basename(id)

        if (options.hash) {
          const code = readFileSync(id).toString()
          const hash = hasha(code, { algorithm: 'md5' })
          name = `${basename(id, ext)}-${hash}${ext}`
        }

        const outputFile = `${output}/${name}`

        let baseIndex = outputFile.indexOf(sep)
        baseIndex = baseIndex !== -1 ? baseIndex + 1 : 0

        createReadStream(id).pipe(createWriteStream(outputFile))
        return `export default "${options._slash ? './' : ''}${outputFile.slice(
          baseIndex
        )}"`
      }
    }
  }
}
