const path = require('path');
const chalk = require('chalk');
const builder = require("electron-builder")
const paths = require('../config/paths');
const cliOptions = require(path.resolve(paths.appRootPath, 'electron.config.js'));

console.log(`  ${chalk.cyan('•')} 开始打包`);

// 打包
builder.build(cliOptions)
	.then((res) => {
		res.forEach((item) => {
			console.log(`  ${chalk.cyan('•')} ${chalk.green(item)}`);
		});
		console.log(`  ${chalk.bold.green('✔')} ${chalk.green(`打包完成！可在${chalk.yellow(`【${cliOptions.config.directories.output}】`)}目录查看`)}`);
	})
	.catch((err) => {
		console.log(err);
		process.exit(1);
	})
	.finally(() => {
		process.exit(0);
	});
