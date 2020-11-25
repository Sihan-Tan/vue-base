const { resolve } = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const argv = require('yargs-parser')(process.argv.slice(2));
const crossEnv = process.env.NODE_ENV;
const _mode = crossEnv || argv.mode || 'development';
const { merge } = require('webpack-merge');
const mergeConfig = require(`./build/webpack.${_mode}.js`);
const isDev = _mode === 'development';

//公共选项配置区域
let cssLoaders = [
  MiniCssExtractPlugin.loader,
  {
      loader: 'css-loader',
      options: {
          importLoaders: 1,
      },
  },
  {
      loader: 'postcss-loader',
  },
];

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
        test: /\.(ts|js|tsx)$/,
        use: 'babel-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|woff|woff2|ttf|svg|otf)$/,
        type: 'asset',
      },
      {
        test: /\.css$/,
        use: cssLoaders,
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      }
    ],
  },
  plugins: [new VueLoaderPlugin(), new ProgressBarPlugin()],
};
console.log(merge(baseConfig, mergeConfig).plugins[3]);
module.exports = merge(baseConfig, mergeConfig);
