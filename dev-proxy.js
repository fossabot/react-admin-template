module.exports = {
	'/mock': {
		target: 'http://localhost',
		changeOrigin: true,
		pathRewrite: {
			'^/mock': '/mock',
		},
	},
	'/api': {
		target: 'http://localhost:10086',
		changeOrigin: true,
		pathRewrite: {
			'^/api': '/',
		},
	},
};
