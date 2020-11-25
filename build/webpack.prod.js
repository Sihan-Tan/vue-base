const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

const prodConfig = {
  mode: 'production',
  output: {
    path: resolve(__dirname, '..', 'dist/assets'),
    filename: 'js/[name]_[contenthash:5].js',
    publicPath: './assets/',
    assetModuleFilename: 'images/[name]_[contenthash:5].[ext]',
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [resolve(__dirname, '..', 'dist')],
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true,
    }),
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i,
      filename: 'js/[base].gz',
    }),
    new webpack.DefinePlugin({
      DEVELOPMENT: JSON.stringify(false),
      PRODUCTION: JSON.stringify(true),
    }),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, '..', 'public/prod.html'),
      filename: '../index.html',
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
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: '../report.html',
    }),
  ],
  externals: {
    vue: 'Vue',
    vuex: 'Vuex',
    'vue-router': 'VueRouter',
  },
  optimization: {
    // minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true, // 是否并行打包
      }),
    ],
    runtimeChunk: {
      name: 'runtime',
    },
    splitChunks: {
      chunks: 'async',
      minChunks: 1, //最少引入了1次
      name: false,
      //分割代码块
      cacheGroups: {
        vendor: {
          //第三方依赖
          priority: 1, //设置优先级，首先抽离第三方模块
          name: 'vendor',
          test: /node_modules/,
          chunks: 'initial',
          maxSize: 20000,
          minSize: 3000,
          minChunks: 1, //最少引入了1次
        },
        //缓存组
        common: {
          //公共模块
          chunks: 'initial',
          name: 'common',
          maxInitialRequests: 5,
          // minSize: 0, //大小超过100个字节
          minChunks: 2, //最少引入了3次
        },
      },
    },
  },
};

module.exports = prodConfig;
