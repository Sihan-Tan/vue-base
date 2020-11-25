//webpack.config.dll.js
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    vue: ['vue', 'vuex', 'vue-router'],
  },
  mode: 'production',
  output: {
    filename: '[name].dll.[hash:6].js',
    path: path.resolve(__dirname, '..', 'stage', 'dll'),
    library: '[name]_dll', //暴露给外部使用
    //libraryTarget 指定如何暴露内容，缺省时就是 var
  },
  plugins: [
    new webpack.DllPlugin({
      //name和library一致
      name: '[name]_dll',
      format: true,
      path: path.resolve(__dirname, '..', 'stage', 'dll', 'manifest.json'), //manifest.json的生成路径
    }),
  ],
};
