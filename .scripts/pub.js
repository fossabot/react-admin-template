process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

process.on('unhandledRejection', error => {
	throw error;
});

const chalk = require('chalk');
const rimraf = require('rimraf');
const webpack = require('webpack');

const paths = require('./config/paths');
const webpackConfig = require('./webpack/webpack-pub-config');

rimraf(paths.appDistPath, err => {
	if (err) throw err;

	console.log(
		chalk.cyan(`\n 目录【${chalk.yellow(paths.appDistPath)}】清理成功, 等待打包...\n`),
	);

	webpack(webpackConfig, (err, stats) => {
		if (err) throw err;

		process.stdout.write(
			`${stats.toString({
				colors: true,
				modules: false,
				children: false,
				chunks: false,
				chunkModules: false,
			})} \n\n`,
		);

		console.log(chalk.cyan('  打包完成。'));
	});
});
