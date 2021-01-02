const chalk = require('chalk');
const figlet = require('figlet');
const semver = require('semver');
const { capitalCase } = require('change-case');
const { printEnvironment } = require('./printer');
const paths = require('../config/paths');
const { name, engines } = require(paths.appRootPkgJson);
const currentNodeVersion = process.version;
const requiredNodeVersion = engines.node;
const envs = ['development', 'test', 'production'];
const NODE_ENV = process.env.NODE_ENV;
const BUILD_ENV = process.env.BUILD_ENV;

try {
	console.log(chalk.gray(figlet.textSync(capitalCase(name))));
} catch (err) {
	console.log(err);
}

// Node Version
if (!semver.satisfies(currentNodeVersion, requiredNodeVersion)) {
	console.log(chalk.yellow(` 你当前${chalk.red('Node')}版本${chalk.red(currentNodeVersion)}，期望${chalk.red('Node')}版本${chalk.red(requiredNodeVersion)}`));
	console.log(chalk.yellow(` 点击右侧连接下载新版: https://nodejs.org/zh-cn/`));
	console.log(chalk.yellow(` 也可以使用nvm管理Node版本: https://github.com/nvm-sh/nvm`));
	console.log();
	process.exit(1);
}

// env
if (!BUILD_ENV) {
	console.log(chalk.red(' The BUILD_ENV environment variable is required but was not specified.'));
	console.log();
	process.exit(1);
}

if (!envs.includes(NODE_ENV)) {
	console.log(chalk.red(` The NODE_ENV environment variable is must be on of [${envs.join(', ')}].`));
	console.log();
	process.exit(1);
}

console.log(chalk.gray(` 本次启动参数:`));
printEnvironment();
console.log();
