const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/hisujung',
    createProxyMiddleware({
      // target: 'http://34.97.29.41:80', // 인그레스 IP 주소 추가
      target: 'http://34.47.73.186', // 인그레스 IP 주소 추가
      changeOrigin: true,
    })
  );
};

