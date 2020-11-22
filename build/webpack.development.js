const { resolve } = require('path');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const notifier = require('node-notifier');

let port = 8080;

const devConfig = {
  mode: 'development',
  devServer: {
    contentBase: resolve(__dirname, 'dist'),
    hot: true,
    compress: true,
    port,
  },
  performance: {
    hints: false,
  },
  plugins: [
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
          title: 'Webpack React',
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
