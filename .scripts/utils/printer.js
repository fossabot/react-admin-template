const os = require('os');
const chalk = require('chalk');
const figlet = require('figlet');
const { capitalCase } = require('change-case');
const { exec } = require('./functions');
const { name, version, gitBranch, gitCommitHash } = require('../config');

function printName() {
	try {
		console.log(chalk.gray(figlet.textSync(capitalCase(name))));
	} catch (err) {
		console.log(err);
	}
}

function printEnvironment() {
	console.log(chalk.cyan(` name: ${chalk.yellow(name)}`));
	console.log(chalk.cyan(` version: ${chalk.yellow(version)}`));
	console.log(chalk.cyan(` branch: ${chalk.yellow(gitBranch)}`));
	console.log(chalk.cyan(` last commit: ${chalk.yellow(`${exec('git log -1 --pretty=%s%b')} (${gitCommitHash})`)}`));

	console.log(chalk.cyan(` NODE_ENV: ${chalk.yellow(process.env.NODE_ENV)}`));
	console.log(chalk.cyan(` BUILD_ENV: ${chalk.yellow(process.env.BUILD_ENV)}`));

	console.log(chalk.cyan(` Node.js: ${chalk.yellow(process.version)}`));
	console.log(chalk.cyan(` OS: ${chalk.yellow(os.hostname(), os.type(), os.version(), os.platform(), os.arch())}`));
}

function printInstructions(localUrl, networkUrl) {
	console.log();
	console.log(chalk.gray(' Server running at:'));
	console.log(` ${chalk.bold(`${chalk.green('✔')} Local:`)}   ${chalk.blue(localUrl)}`);
	console.log(` ${chalk.bold(`${chalk.green('✔')} Network:`)} ${chalk.blue(networkUrl)}`);
	console.log();
}

module.exports = {
	printName,
	printEnvironment,
	printInstructions,
};
