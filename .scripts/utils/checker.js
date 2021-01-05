const chalk = require('chalk');
const { printName, printEnvironment } = require('./printer');
const { nodeVersionCheck } = require('./functions');
const envs = ['development', 'test', 'production'];
const NODE_ENV = process.env.NODE_ENV;
const BUILD_ENV = process.env.BUILD_ENV;

// logo
printName();

// Node Version
nodeVersionCheck();

// BUILD_ENV
if (!BUILD_ENV) {
	console.log(chalk.red(' The BUILD_ENV environment variable is required but was not specified.'));
	console.log();
	process.exit(1);
}

// NODE_ENV
if (!envs.includes(NODE_ENV)) {
	console.log(chalk.red(` The NODE_ENV environment variable is must be on of [${envs.join(', ')}].`));
	console.log();
	process.exit(1);
}

console.log(chalk.gray(` 本次启动参数:`));
printEnvironment();
console.log();
