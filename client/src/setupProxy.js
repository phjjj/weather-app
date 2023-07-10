//http-proxy-middleware 1.x.x 이상
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://localhost:4000",
      changeOrigin: true,
    })
  );
};
