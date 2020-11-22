const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const notifier = require('node-notifier');
const argv = require('yargs-parser')(process.argv.slice(2));
const _mode = argv.mode || 'development';
const { merge } = require('webpack-merge');
const mergeConfig = require(`./build/webpack.${_mode}.js`);
const isDev = _mode === 'development';

const baseConfig = {
  entry: {
    app: resolve(__dirname, 'src/main.js'),
  },
  output: {
    path: resolve(__dirname, 'dist/assets'),
    filename: 'js/[name]_[contenthash:5].js',
    publicPath: isDev ? '/' : './',
    assetModuleFilename: 'js/[name]_[contenthash:5].[ext]',
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm.js',
      '@': resolve(__dirname, 'src'),
    },
    extensions: ['.vue', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(ttf|pdf|mp3|mp4|avi)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[contenthash:5].[ext]',
              outputPath: 'files/',
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'images/[name]_[contenthash:5].[ext]',
              limit: 8192,
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.(js)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          'thread-loader',
          'cache-loader',
          {
            loader: 'babel-loader',
          },
        ],
        include: [resolve(__dirname, 'src')],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // esModule: false,
            },
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/dev.html',
      filename: 'index.html',
    }),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        notes: [
          'Some additionnal notes to be displayed unpon successful compilation',
        ],
        messages: [
          `You application is running here http://localhost:${mergeConfig.devServer.port}`,
        ],
      },
      onErrors: function(severity, errors) {
        if (severity !== 'error') {
          return;
        }
        notifier.notify({
          title: 'Webpack React',
          message: 'Webpack Compile Error',
          icon: '', // Absolute path (doesn't work on balloons)
          sound: true, // Only Notification Center or Windows Toasters
          wait: true, // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait or notify-send as it does not support the wait option
        });
      },
      clearConsole: true,
    }),
    new ProgressBarPlugin(),
  ],
};
// console.log(merge(baseConfig, mergeConfig));
module.exports = merge(mergeConfig, baseConfig);
