import type { Options } from 'tsup'

export const tsup: Options = {
  entry: ['src/node.ts','src/client.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  clean: true,
  shims: false,

}
