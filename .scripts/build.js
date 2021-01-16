// CI传入参数不一定是development、test、production之一，此处用BUILD_ENV代替修正
if (!process.env.BUILD_ENV && process.env.NODE_ENV) {
	process.env.BUILD_ENV = process.env.NODE_ENV;
}

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

process.on('unhandledRejection', (error) => {
	throw error;
});

// check
require('./utils/checkers');

const chalk = require('chalk');
const rimraf = require('rimraf');
const paths = require('./config/paths');
const webpackRenderProdConfig = require('./webpack/webpack.render.prod.config');
const webpackMainProdConfig = require('./webpack/webpack.main.prod.config');
const { build } = require('./utils/functions');

rimraf(paths.appRenderDistPath, (err) => {
	if (err) throw err;

	console.log(chalk.gray(` 目录【${paths.appRenderDistPath}】清理成功, 等待打包...`));

	build(webpackRenderProdConfig).then(res => {
		console.log(`${res}`);
		console.log(` ${chalk.bold(chalk.green('✔'))} ${chalk.green('打包完成')}`);
	}).catch(err => {
		console.log(err);
		process.exit(1);
	});
});
