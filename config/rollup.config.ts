// @ts-ignore
import resolve from 'rollup-plugin-node-resolve'
// @ts-ignore
import typescript from 'rollup-plugin-typescript2'
// @ts-ignore
import pkg from '../package.json'

const config = {
  input: './src/index.ts',
  output: [
    {
      name: 'PyroForm',
      file: pkg.browser,
      format: 'umd',
    },
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' },
  ],

  external: ['react'],

  plugins: [
    resolve({
      jsnext: true,
      extensions: ['.ts', '.tsx'],
    }),
    typescript(),
  ],
}

module.exports = config
