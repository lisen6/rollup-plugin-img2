import { FilterPattern } from '@rollup/pluginutils'
import { Plugin } from 'rollup'

export interface RollupImageOptions {
  output: string
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

export default function image(options?: RollupImageOptions): Plugin
