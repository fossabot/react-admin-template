const path = require('path');
const chalk = require('chalk');
const rimraf = require('rimraf');
const builder = require("electron-builder")
const paths = require('../config/paths');
const { cliOptions } = require(path.resolve(paths.appRootPath, 'electron.config.js'));
const outputPath = cliOptions.config.directories.output;

rimraf(outputPath, (err) => {
	if (err) throw err;

	console.log(chalk.yellowBright(`  ${chalk.cyan('•')} 打包输出目录【${outputPath}】清理成功, 开始打包...`));

	builder.build(cliOptions)
		.then((res) => {
			res.forEach((item) => {
				console.log(`  ${chalk.cyan('•')} ${chalk.green(item)}`);
			});
			console.log(`  ${chalk.bold.greenBright('✔')} ${chalk.cyanBright(`打包完成！可在${chalk.greenBright(`【${outputPath}】`)}目录查看`)}`);
		})
		.catch((err) => {
			console.log(err);
			process.exit(1);
		})
		.finally(() => {
			process.exit(0);
		});
});

