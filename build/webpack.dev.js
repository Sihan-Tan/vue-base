const { resolve } = require('path');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const notifier = require('node-notifier');
const webpack = require('webpack');
const port = 8888;

const devConfig = {
  mode: 'development',
  output: {
    path: resolve(__dirname, '..', 'dist/assets'),
    pathinfo: false,
    filename: 'js/[name]_[contenthash:5].js',
    publicPath: '/',
    assetModuleFilename: 'images/[name]_[contenthash:5].[ext]',
  },
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    contentBase: resolve(__dirname, '..', 'dist'),
    hot: true,
    quiet: true,
    compress: true,
    historyApiFallback: true,
    port,
    open: false,
  },
  cache: {
    type: 'memory',
  },
  optimization: {
    runtimeChunk: true,
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false
  },
  performance: {
    hints: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, '..', 'public/dev.html'),
      filename: 'index.html',
    }),
    new webpack.DllReferencePlugin({
			// context: resolve(__dirname, "..", "dll"),
			manifest: require("../dll/vue-manifest.json") // eslint-disable-line
		}),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        notes: [
          'Some additionnal notes to be displayed unpon successful compilation',
        ],
        messages: [`You application is running here http://localhost:${port}`],
      },
      onErrors(severity, errors) {
        console.log(errors);
        if (severity !== 'error') {
          return;
        }
        notifier.notify({
          title: 'Webpack Vue2',
          message: 'Webpack Compile Error',
          icon: '', // Absolute path (doesn't work on balloons)
          sound: true, // Only Notification Center or Windows Toasters
          wait: true,
        });
      },
      clearConsole: true,
    }),
  ],
};

module.exports = devConfig;
