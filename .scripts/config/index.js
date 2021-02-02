const fs = require('fs');
const path = require('path');
const dayjs = require('dayjs');
const { pascalCase } = require('change-case');
const childProcess = require('child_process');
const paths = require('./paths');
const { name, version, engines } = require(paths.appRootPkgJson);

let proxy = {};
const proxyPath = path.resolve(paths.appRootPath, 'dev.proxy.js');
if (fs.existsSync(proxyPath)) {
	proxy = require(proxyPath);
}

// execSync
function execSync(cmd, options) {
	return childProcess.execSync(cmd, options).toString().trim();
}

module.exports = {
	// dev
	hostName: '0.0.0.0',
	port: 3000,
	proxy: { ...proxy },

	// env
	appPublicPath: '',
	buildEnv: process.env.BUILD_ENV,
	buildTarget: process.env.BUILD_TARGET,
	bundleAnalyze: process.env.BUNDLE_ANALYZE,
	useSourceMap: process.env.GENERATE_SOURCEMAP === 'true' || process.env.BUILD_ENV !== 'production',

	// 已知可配置cache参数的plugin、loader的cache开关，方便升级webpack5的时候排查改造
	enableCache: false,

	// dll
	dllConfig: {
		entryKey: 'dll',
		filename: 'dll_scripts.js',
		library: 'dll_library',
		manifest: 'dll_manifest.json',
	},

	// 其他无关痛痒的参数
	name: pascalCase(name),
	version,
	enginesRequired: engines && engines.node ? engines : { ...engines, node: '>=10.13.0' },
	gitBranch: execSync('git rev-parse --abbrev-ref HEAD'),
	gitCommitHash: execSync('git show -s --format=%h'),
	buildTime: dayjs().toJSON(),
};
