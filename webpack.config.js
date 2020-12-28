const { resolve } = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');


const crossEnv = process.env.NODE_ENV;
const mode = crossEnv || 'dev';
const { merge } = require('webpack-merge');

// eslint-disable-next-line import/no-dynamic-require
const mergeConfig = require(`./build/webpack.${mode}.js`);

// 公共选项配置区域
const cssLoaders = [
  {
    loader: MiniCssExtractPlugin.loader,
    options: {
      // esModule: false,
      publicPath: '../',
    },
  },
  {
    loader: 'css-loader',
    options: {
      importLoaders: 1,
    },
  },
  {
    loader: 'less-loader',
    options: {
      lessOptions: {
        modifyVars: {},
        javascriptEnabled: true,
      },
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
    modules: [resolve(__dirname, 'node_modules')],
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
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      {
        test: /\.(css|less)$/,
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
    new StylelintPlugin({
      configFile: './stylelint.config.js',
      files: 'src/**/*.(vue|less)',
      fix: true,
      emitError: true,
      emitWarning: true,
      failOnError: true,
      failOnWarning: true,
      quiet: false,
    }),
  ],
};

console.log(merge(baseConfig, mergeConfig).mode);
module.exports = merge(baseConfig, mergeConfig);
