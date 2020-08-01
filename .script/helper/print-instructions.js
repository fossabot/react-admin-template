const chalk = require('chalk');

/**
 * 一些提示输出，以后可能会添加其他
 * @param {String} localUrl
 * @param {String} networkUrl
 */
function printInstructions(localUrl, networkUrl) {
	console.log();
	console.log(chalk.cyan(' Server running at:'));
	console.log();
	console.log(` ${chalk.bold(`${chalk.green('✔')} Local:`)}   ${chalk.blue(localUrl)}`);
	console.log(` ${chalk.bold(`${chalk.green('✔')} Network:`)} ${chalk.blue(networkUrl)}`);
	console.log();
}

module.exports = printInstructions;
