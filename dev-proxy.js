module.exports = {
	'/mock': {
		target: 'http://localhost',
		changeOrigin: true,
		pathRewrite: {
			'^/mock': '/mock',
		},
	},
	'/api': {
		target: 'https://www.baidu.com',
		changeOrigin: true,
		pathRewrite: {
			'^/api': '/',
		},
	},
};
