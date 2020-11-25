const { resolve } = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const crossEnv = process.env.NODE_ENV;
const _mode = crossEnv || 'dev';
console.table(_mode);
const { merge } = require('webpack-merge');
const mergeConfig = require(`./build/webpack.${_mode}.js`);

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
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name]_[contenthash:5].css',
    }),
    new ProgressBarPlugin(),
  ],
};
// console.log(merge(baseConfig, mergeConfig).plugins);
module.exports = merge(baseConfig, mergeConfig);
