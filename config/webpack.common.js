const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers = require('./helpers');

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },

  resolve: {
    extensions: ['', '.ts', '.js'],
    modulesDirectories: ['web_modules', 'node_modules'],
    alias: {
      AlloyImage: 'AlloyImage/combined/alloyimage.js'
    }
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: [
          'babel-loader?presets[]=es2015',
          'awesome-typescript-loader',
          // For angular2:
          //'angular2-template-loader',
          //`angular2-router-loader?genDir=compiled/app&aot=true`
        ],
        exclude: [/\.(spec|e2e|d)\.ts$/]
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src'),
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
      },
      {
        test: /\.css$/,
        include: helpers.root('src'),
        loader: 'raw'
      },
      {
        test: /jquery\.js/,
        loader: 'null',
        exclude: path.resolve('node_modules')
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'window.jquery': 'jquery'
    })
  ]
};