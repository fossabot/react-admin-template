/**
 * 自家 CI 对 NODE_ENV 传参不一定是development、test、production之一
 * 此处用 BUILD_ENV 接管，并将 NODE_ENV 强制赋值为 production
 */
if (!process.env.BUILD_ENV && process.env.NODE_ENV) {
	process.env.BUILD_ENV = process.env.NODE_ENV;
}

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

process.on('unhandledRejection', (error) => {
	throw error;
});

// check
require('../utils/checkers');

const chalk = require('chalk');
const rimraf = require('rimraf');
const paths = require('../config/paths');
const webpackProdConfig = require('./webpack/webpack.prod.config');
const { build } = require('../utils/functions');

// 配置有CleanWebpackPlugin，rimraf可以删除
rimraf(paths.appWebDistPath, (err) => {
	if (err) throw err;

	console.log(chalk.gray(` 目录【${paths.appWebDistPath}】清理成功, 等待打包...`));

	build(webpackProdConfig)
		.then((res) => {
			console.log(`${res}`);
			console.log(` ${chalk.bold(chalk.green('✔'))} ${chalk.green('打包完成')}`);
		})
		.catch((err) => {
			console.log(err);
			process.exit(1);
		});
});
