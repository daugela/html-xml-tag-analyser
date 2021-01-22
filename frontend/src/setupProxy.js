const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
    app.use(
        '/process-tags*',
        createProxyMiddleware({
            target: 'http://127.0.0.1:8000', // Django API endpoint
            changeOrigin: true,
        })
    );
};