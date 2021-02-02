const path = require('path');
const chalk = require('chalk');
const rimraf = require('rimraf');
const builder = require("electron-builder")
const paths = require('../config/paths');
const { cliOptions } = require(path.resolve(paths.appRootPath, 'electron.config.js'));
const outputPath = cliOptions.config.directories.output;

rimraf(outputPath, (err) => {
	if (err) throw err;

	console.log(chalk.yellow(`  ${chalk.cyan('•')} 输出目录【${outputPath}】清理成功, 开始打包...`));

	builder.build(cliOptions)
		.then((res) => {
			res.forEach((item) => {
				console.log(`  ${chalk.cyan('•')} ${chalk.green(item)}`);
			});
			console.log(`  ${chalk.bold.green('✔')} ${chalk.green(`打包完成！可在${chalk.yellow(`【${outputPath}】`)}目录查看`)}`);
		})
		.catch((err) => {
			console.log(err);
			process.exit(1);
		})
		.finally(() => {
			process.exit(0);
		});
});

