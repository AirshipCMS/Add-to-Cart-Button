const webpack = require('webpack');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/airship-add-to-cart-button.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'airship-add-to-cart-button.min.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },
  plugins: [
    new MinifyPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
};