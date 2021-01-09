const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');
const paths = require('./paths');
const { name, version, engines } = require(paths.appRootPkgJson);

let proxy = {};
const proxyPath = path.resolve(paths.appRootPath, 'dev-proxy.js');
if (fs.existsSync(proxyPath)) {
	proxy = require(proxyPath);
}

// exec
function exec(cmd, options) {
	return childProcess.execSync(cmd, options).toString().trim();
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

	// 其他无关痛痒的参数
	name,
	version,
	engines,
	gitBranch: exec('git rev-parse --abbrev-ref HEAD'),
	gitCommitHash: exec('git show -s --format=%h'),
	buildTime: new Date().toLocaleString(),
};
