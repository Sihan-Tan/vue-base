const { resolve } = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
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
    publicPath: isDev ? '/' : './assets/',
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
  plugins: [new VueLoaderPlugin(), new ProgressBarPlugin()],
};
// console.log(merge(baseConfig, mergeConfig));
module.exports = merge(mergeConfig, baseConfig);
