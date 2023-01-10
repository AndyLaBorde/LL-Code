const HtmlWebpackPlugin = require('html-webpack-plugin');
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
      title: 'J.A.T.E.',
    }),
    new InjectManifest({
      swSrc: './sw.js',
      swDest: '/service-worker.js',
    }),
    new WebpackPwaManifest({
    name: 'Just Another Text Editor',
    short_name: 'J.A.T.E.',
    description: 'Javascript text editor application!!',
    background_color: '#ffffff',
    crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
    start_url: "/",
    publicPath: "/",
    icons: [
      {
        // small icon
        src: path.resolve('src/images/logo.png'),
        sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
        destination: path.join("assets", "icons"),
      }
    ]
  }),
    ],

    module: {
      rules: [
        {
        test: /.css$/i,
        use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/icons",
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
