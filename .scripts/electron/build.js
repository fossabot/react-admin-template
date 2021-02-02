/**
 * 自家 CI 对 NODE_ENV 传参不一定是development、test、production之一
 * 此处用 BUILD_ENV 接管，并将 NODE_ENV 强制赋值为 production
 */
if (!process.env.BUILD_ENV && process.env.NODE_ENV) {
	process.env.BUILD_ENV = process.env.NODE_ENV;
}

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';
process.env.BUILD_TARGET = 'electron';

process.on('unhandledRejection', (error) => {
	throw error;
});

// check
require('../utils/checkers');

const chalk = require('chalk');
const rimraf = require('rimraf');

const { appBuildPath } = require('../config/paths');
const { webpackBuilder } = require('../utils/functions');

// 配置有CleanWebpackPlugin，rimraf可以删除
rimraf(appBuildPath, (err) => {
	if (err) throw err;

	console.log(chalk.yellowBright(` 构建输出目录【${appBuildPath}】清理成功, 开始构建...`));

	Promise.all([
		webpackBuilder(require('./webpack/webpack.prod.config')),
		webpackBuilder(require('../web/webpack/webpack.prod.config')),
	])
		.then((res) => {
			console.log(chalk.green('------------------ 构建日志输出开始 ------------------'));
			res.forEach(((item, index) => {
				if (index) {
					console.log(chalk.green('------------------ 构建日志输出分割 ------------------'));
				}
				console.log(`${item}`);
			}));
			console.log(chalk.green('------------------ 构建日志输出结束 ------------------'));
			console.log();
			console.log(` ${chalk.bold.greenBright('✔')} ${chalk.cyanBright(`主进程和渲染进程代码构建完成！可在${chalk.greenBright(`【${appBuildPath}】`)}目录查看`)}`);
			console.log();
			require('./packager');
		})
		.catch((err) => {
			console.log(err);
			process.exit(1);
		});
});

