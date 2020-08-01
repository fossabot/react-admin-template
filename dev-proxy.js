module.exports = {
	'/api': {
		target: 'https://www.baidu.com',
		changeOrigin: true,
		pathRewrite: {
			'^/api': '/',
		},
	},
};
