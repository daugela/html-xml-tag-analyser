const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
    app.use(
        '/process-tags*',
        createProxyMiddleware({
            target: 'http://django:8000', // Django API endpoint
            changeOrigin: true,
            secure: false
        })
    );
};