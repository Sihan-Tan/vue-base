const { resolve } = require('path');

const devConfig = {
  mode: 'development',
  devServer: {
    contentBase: resolve(__dirname, 'dist'),
    hot: true,
    compress: true,
    port: 9000,
  },
  performance: {
    hints: false,
  },
};

module.exports = devConfig;
