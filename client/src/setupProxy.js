//http-proxy-middleware 1.x.x 이상
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target:
        "http://ec2-43-201-72-126.ap-northeast-2.compute.amazonaws.com:4000",
      changeOrigin: true,
    })
  );
};
