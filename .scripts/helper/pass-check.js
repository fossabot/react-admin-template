const os = require('os');
const chalk = require('chalk');
const figlet = require('figlet');
const semver = require('semver');
const { capitalCase } = require('change-case');
const paths = require('../config/paths');
const { name, engines } = require(paths.appRootPkgJson);
const currentNodeVersion = process.version;
const requiredNodeVersion = engines.node;
const envs = ['development', 'test', 'production'];
const NODE_ENV = process.env.NODE_ENV;
const BUILD_ENV = process.env.BUILD_ENV;

figlet(capitalCase(name), (err, data) => {
	if (!err) {
		console.log(chalk.gray(data));
	}

	// Node Version
	if (!semver.satisfies(currentNodeVersion, requiredNodeVersion)) {
		console.log(chalk.yellow(`  你当前${chalk.red('Node')}版本${chalk.red(currentNodeVersion)}，期望${chalk.red('Node')}版本${chalk.red(requiredNodeVersion)}`));
		console.log(chalk.yellow(`  点击右侧连接下载新版: https://nodejs.org/zh-cn/`));
		console.log(chalk.yellow(`  也可以使用nvm管理Node版本: https://github.com/nvm-sh/nvm`));
		console.log();
		process.exit(1);
	}

	// env
	if (!BUILD_ENV) {
		console.log(chalk.red('  The BUILD_ENV environment variable is required but was not specified.'));
		console.log();
		process.exit(1);
	}

	if (!envs.includes(NODE_ENV)) {
		console.log(chalk.red(`  The NODE_ENV environment variable is must be on of ${envs.join(', ')}.`));
		console.log();
		process.exit(1);
	}

	console.log(chalk.gray(`  本次启动参数:`));
	console.log(chalk.cyan(`  OS: ${chalk.yellow(os.hostname(), os.type(), os.version(), os.platform(), os.arch())}`));
	console.log(chalk.cyan(`  Node.js: ${chalk.yellow(currentNodeVersion)}`));
	console.log(chalk.cyan(`  BUILD_ENV: ${chalk.yellow(BUILD_ENV)}`));
	console.log(chalk.cyan(`  NODE_ENV: ${chalk.yellow(NODE_ENV)}`));
	console.log();
});
