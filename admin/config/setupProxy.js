/***
 *
 * 代理，仅devServer
 *
 * ****/
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app){
    app.use(
        //  常规换源，后台admin替换
        createProxyMiddleware('/admin', {
            target: 'http://127.0.0.1:7001',
            changeOrigin: true,
            // pathRewrite: {
            //     '^/api': ''
            // }
        }),
        //  图片资源
        createProxyMiddleware('/upload', {
            target: 'http://horizon.wx.h5work.com',
            changeOrigin: true,
        })
    );
};
