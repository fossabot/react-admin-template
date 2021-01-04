const fs = require('fs');
const path = require('path');
const child_process = require('child_process');
const paths = require('./paths');

let proxy = {};
const proxyPath = path.resolve(paths.appRootPath, 'dev-proxy.js');
if (fs.existsSync(proxyPath)) {
	proxy = require(proxyPath);
}

let gitBranch = null;
try {
	const command = 'git rev-parse --abbrev-ref HEAD';
	gitBranch = child_process.execSync(command, { encoding: 'utf8' }).trim();
} catch (e) {}

module.exports = {
	hostName: '0.0.0.0',
	port: 3000,
	proxy: { ...proxy },
	appPublicPath: '/',
	gitBranch,
	buildEnv: process.env.BUILD_ENV,
	buildTime: new Date().toLocaleString(),
	bundleAnalyze: process.env.BUNDLE_ANALYZE,
	useSourceMap: process.env.GENERATE_SOURCEMAP === 'true',
	dllConfig: {
		entryKey: 'dll',
		filename: 'dll_scripts.js',
		library: 'dll_library',
		manifest: 'dll_manifest.json',
	},
};
