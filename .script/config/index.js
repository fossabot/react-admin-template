const fs = require('fs');
const path = require('path');
const paths = require('./paths');

let proxy = {};
const proxyPath = path.resolve(paths.appRootPath, 'dev-proxy.js');
if (fs.existsSync(proxyPath)) {
	proxy = require(proxyPath);
}

module.exports = {
	hostName: '0.0.0.0',
	port: 3000,
	proxy: {
		'/mock': {
			target: 'http://localhost',
			changeOrigin: true,
			pathRewrite: {
				'^/mock': '/mock',
			},
		},
		...proxy,
	},
	staticSourcePathPrefix: '',
	env: process.env.NODE_ENV,
	analyze: process.env.ANALYZE,
	paths,
	dll: {
		entryKey: 'dll',
		filename: 'dll_scripts.js',
		library: 'dll_library',
		manifest: 'dll_manifest.json',
	},
};
