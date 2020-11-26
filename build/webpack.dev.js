const { resolve } = require('path');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const notifier = require('node-notifier');
const webpack = require('webpack');

let port = 8888;

const devConfig = {
  mode: 'development',
  output: {
    path: resolve(__dirname, '..', 'dist/assets'),
    filename: 'js/[name]_[contenthash:5].js',
    publicPath: '/',
    assetModuleFilename: 'images/[name]_[contenthash:5].[ext]',
  },
  devServer: {
    contentBase: resolve(__dirname, '..', 'dist'),
    hot: true,
    quiet: true,
    compress: true,
    historyApiFallback: true,
    port,
    open: false,
  },
  performance: {
    hints: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      DEVELOPMENT: JSON.stringify(true),
      PRODUCTION: JSON.stringify(false),
    }),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, '..', 'public/dev.html'),
      filename: 'index.html',
    }),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        notes: [
          'Some additionnal notes to be displayed unpon successful compilation',
        ],
        messages: [`You application is running here http://localhost:${port}`],
      },
      onErrors: function(severity, errors) {
        if (severity !== 'error') {
          return;
        }
        notifier.notify({
          title: 'Webpack Vue2',
          message: 'Webpack Compile Error',
          icon: '', // Absolute path (doesn't work on balloons)
          sound: true, // Only Notification Center or Windows Toasters
          wait: true, // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait or notify-send as it does not support the wait option
        });
      },
      clearConsole: true,
    }),
  ],
};

module.exports = devConfig;
