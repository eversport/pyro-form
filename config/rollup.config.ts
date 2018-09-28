// @ts-ignore
import resolve from 'rollup-plugin-node-resolve'
// @ts-ignore
import typescript from 'rollup-plugin-typescript2'
// @ts-ignore
import pkg from '../package.json'

const config = [
  {
    input: './src/index.ts',
    output: [{ file: pkg.main, format: 'cjs' }, { file: pkg.module, format: 'es' }],

    external: ['react'],

    plugins: [
      resolve({
        jsnext: true,
        extensions: ['.ts', '.tsx'],
      }),
      typescript(),
    ],
  },

  {
    input: './src/index.ts',
    output: {
      globals: { react: 'React' },
      name: 'PyroForm',
      file: pkg.browser,
      format: 'umd',
    },

    external: ['react'],

    plugins: [
      resolve({
        jsnext: true,
        extensions: ['.ts', '.tsx'],
      }),
      typescript({ tsconfigOverride: { compilerOptions: { target: 'es5' } } }),
    ],
  },
]

module.exports = config
