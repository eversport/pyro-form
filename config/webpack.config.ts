import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import webpack from 'webpack'

const root = path.resolve(__dirname, '..')

const config: webpack.Configuration = {
  mode: 'development',
  entry: path.join(root, 'example', 'index.tsx'),
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [{ test: /\.tsx?$/, loader: 'ts-loader' }],
  },
  output: {
    path: path.join(root, 'public'),
    filename: 'bundle.js',
  },
  plugins: [
    (new HtmlWebpackPlugin({
      template: path.join(root, 'example', 'index.html'),
    }) as unknown) as webpack.Plugin,
  ],
}

export default config
