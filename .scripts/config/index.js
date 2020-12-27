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
	proxy: { ...proxy },
	appPublicPath: '/',
	buildEnv: process.env.BUILD_ENV,
	bundleAnalyze: process.env.BUNDLE_ANALYZE,
	useSourceMap: process.env.GENERATE_SOURCEMAP === 'true',
	dllConfig: {
		entryKey: 'dll',
		filename: 'dll_scripts.js',
		library: 'dll_library',
		manifest: 'dll_manifest.json',
	},
};
