const { resolve } = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const webpack = require('webpack');

const isDev = process.env.RUN_ENV === 'dev';
console.log(process.env.RUN_ENV);
const mode = isDev ? 'dev' : 'prod';
const { merge } = require('webpack-merge');

// eslint-disable-next-line import/no-dynamic-require
const mergeConfig = require(`./build/webpack.${mode}.js`);

// 公共选项配置区域
const cssLoaders = [
  {
    loader: MiniCssExtractPlugin.loader,
    options: {
      esModule: false,
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
    loader: 'postcss-loader',
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
          // 'thread-loader',
          // 'cache-loader',
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
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: 'asset/inline',
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              symbolId: 'icon-[name]',
            },
          },
        ],
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
      filename: 'css/[name].css',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        RUN_ENV: JSON.stringify(process.env.RUN_ENV),
      },
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

module.exports = merge(baseConfig, mergeConfig);
