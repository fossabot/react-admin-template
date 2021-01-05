const chalk = require('chalk');
const semver = require('semver');
const webpack = require('webpack');
const childProcess = require('child_process');

const paths = require('../config/paths');
const { engines } = require(paths.appRootPkgJson);
const currentNodeVersion = process.version;
const requiredNodeVersion = engines.node;

// exec
exports.exec = function exec(cmd, options) {
	return childProcess.execSync(cmd, options).toString().trim();
}

// Node Version
exports.nodeVersionCheck = function nodeVersionCheck() {
	if (!semver.satisfies(currentNodeVersion, requiredNodeVersion)) {
		console.log(chalk.yellow(` 你当前${chalk.red('Node')}版本${chalk.red(currentNodeVersion)}，期望${chalk.red('Node')}版本${chalk.red(requiredNodeVersion)}`));
		console.log(chalk.yellow(` 点击右侧连接下载新版: https://nodejs.org/zh-cn/`));
		console.log(chalk.yellow(` 也可以使用nvm管理Node版本: https://github.com/nvm-sh/nvm`));
		console.log();
		process.exit(1);
	}
}

// webpack compiler
exports.build = function build(config) {
	return new Promise((resolve, reject) => {
		webpack(config, (err, stats) => {
			if (err) {
				reject(err);
			}

			const message = stats.toString({
				colors: true,
				modules: false,
				children: false,
				chunks: false,
				chunkModules: false,
			});

			if (stats.hasErrors()) {
				reject(message);
			}

			resolve(message);
		});
	})
}
