const webpack = require('webpack');
const {resolve} = require('path');
module.exports = {
  entry: {
    vue: ['vue', 'vuex', 'vue-router', 'axios']
  },
  output: {
    path: resolve(__dirname, '..','dll'),
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      path: resolve(__dirname, '..', 'dll', '[name]-manifest.json'),
      name: '[name]_library',
      // context: __dirname,
    })
  ]
}