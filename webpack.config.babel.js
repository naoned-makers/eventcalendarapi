import webpack from 'webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import fs from 'fs';
import path from 'path';

let nodeModules = {};

fs
  .readdirSync('node_modules')
  .filter((x) => ['.bin'].indexOf(x) === -1)
  .forEach((mod) => nodeModules[mod] = 'commonjs ' + mod);

export default {
  entry: {
    app: path.resolve('src/js/app.js')
  },
  target: 'node',
  output: {
    path: path.resolve('dist'),
    filename: '[name].js'
  },
  externals: nodeModules,
  devtool: 'sourcemap',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }, {
        test: /\.json$/,
        exclude: /node_modules/,
        use: 'json-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(path.resolve('dist')),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false
    })
  ]
};
