/* eslint-disable import/no-extraneous-dependencies */
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const webpack = require('webpack');

const crossEnv = process.env.RUN_ENV;
const mode = crossEnv || 'stage';

const outputPath = resolve(__dirname, '..', `${mode}/assets`);
const templatePath = resolve(__dirname, '..', `public/${mode}.html`);
const cleanPath = resolve(__dirname, '..', mode);

const cdn = {
  js: [
    '//unpkg.com/vue@2.6.12/dist/vue.min.js',
    '//unpkg.com/vue-router@3.4.9/dist/vue-router.min.js',
    '//unpkg.com/vuex@3.5.1/dist/vuex.min.js',
    '//unpkg.com/axios@0.21.1/dist/axios.min.js',
    '//unpkg.com/vuex-persistedstate/dist/vuex-persistedstate.umd.js',
  ],
};

const prodConfig = {
  mode: 'production',
  output: {
    path: outputPath,
    filename: 'js/[name]_[contenthash:5].js',
    publicPath: './assets/',
    assetModuleFilename: 'images/[name]_[contenthash:5].[ext]',
  },
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [cleanPath],
    }),
    new HtmlWebpackPlugin({
      template: templatePath,
      filename: '../index.html',
      // scriptLoading: 'defer',
      cdn,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new ScriptExtHtmlWebpackPlugin({
      inline: 'runtime',
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      // eslint-disable-next-line global-require
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true,
    }),
    new webpack.AutomaticPrefetchPlugin(),
    new CompressionPlugin({
      test: /\.(js|css)$/i,
      filename: '[file].gz',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: '../report.html',
    }),
  ],
  externals: {
    vue: 'Vue',
    vuex: 'Vuex',
    'vue-router': 'VueRouter',
    axios: 'axios',
    'vuex-persistedstate': 'createPersistedState',
  },
  optimization: {
    minimize: true,
    concatenateModules: false,
    minimizer: [
      new TerserWebpackPlugin({
        parallel: true, // 是否并行打包
        test: /\.js(\?.*)?$/i,
        extractComments: false, // 不将评论单独提取成LICENSE文件
        terserOptions: {
          ecma: undefined,
          warnings: false,
          compress: {
            drop_console: true,
            drop_debugger: false,
            pure_funcs: ['console.log'], // 移除console
          },
        },
      }),
    ],
    runtimeChunk: {
      name: 'runtime',
    },
    splitChunks: {
      chunks: 'all',
      maxSize: 30000,
      minSize: 10000,
      minChunks: 1, // 最少引入了1次
      name: false,
      // 分割代码块
      cacheGroups: {
        vendor: {
          // 第三方依赖
          priority: 1, // 设置优先级，首先抽离第三方模块
          name: 'vendor',
          test: /node_modules/,
          maxSize: 50000,
        },
        // 缓存组
        common: {
          // 公共模块
          name: 'common',
          maxInitialRequests: 5,
          // minSize: 0, //大小超过100个字节
          minChunks: 2, // 最少引入了2次
        },
      },
    },
  },
};

module.exports = prodConfig;
