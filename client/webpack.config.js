const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
      template: './index.html',
      title: 'Webpack Plugin',
    }),
    new InjectManifest({
      swSrc: './src/sw.js',
      swDest: 'service-worker.js',
    }),
    new MiniCssExtractPlugin(),
    new WebpackPwaManifest({
    name: 'LL-Code',
    short_name: 'MyPWA',
    description: 'Laborde Laboratories first ever text editor application!!',
    background_color: '#ffffff',
    crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
    icons: [
      {
        src: path.resolve('client/favicon.ico'),
        sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
      },
      {
        src: path.resolve('client/src/images/logo.png'),
        size: '1024x1024' // you can also use the specifications pattern
      }
    ]
  }),
    ],

    module: {
      rules: [
        {
        test: /.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
