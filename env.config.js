module.exports = {
  // 开发
  dev: {
    port: 8888,
    reqUrl: '/api',
    proxy: {
      '/api': {
        target: 'http://dev.daishutijian.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  // 测试
  stage: {

  },
  // 生产
  prod: {

  },
};
