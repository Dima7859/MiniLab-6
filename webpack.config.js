const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { SourceMapDevToolPlugin } = require('webpack');
const { type } = require('os');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HTMLWebpackPlugin ({
      filename: 'index.html',
      template: './src/index.html'
    }),
    new HTMLWebpackPlugin ({
      filename: 'sign-in.html',
      template: './src/components/sign-in/sign-in.html'
    }),
    new HTMLWebpackPlugin ({
      filename: 'sign-up.html',
      template: './src/components/sign-up/sign-up.html'
    }),
    new HTMLWebpackPlugin ({
      filename: 'resetPassword.html',
      template: './src/components/resetPassword/resetPassword.html'
    }),
    new HTMLWebpackPlugin ({
      filename: 'startPage.html',
      template: './src/components/startPage/startPage.html'
    }),
    new SourceMapDevToolPlugin({
        filename: "[file].map"
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use:['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.html$/,
        use:[
          {
            loader: 'html-loader',
            options: {
              sources: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset'
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      }
    ]
  },
  devServer: {
    port: 4200
  }
}
