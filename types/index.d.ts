import { FilterPattern } from '@rollup/pluginutils'
import { Plugin } from 'rollup'

interface RollupImageOptions {
  output: string
  include?: FilterPattern
  exclude?: FilterPattern
  dom?: boolean
  hash?: boolean
  limit?: number
}

export default function image(options?: RollupImageOptions): Plugin
