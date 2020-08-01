require('./helper/complier-pass-check')();
const chalk = require('chalk');
const rimraf = require('rimraf');
const webpack = require('webpack');

const config = require('./config');
const webpackConfig = require('./webpack/webpack-pub-config');

rimraf(config.paths.appDistPath, err => {
	if (err) throw err;

	console.log(
		chalk.cyan(`\n 目录【${chalk.yellow(config.paths.appDistPath)}】清理成功, 等待打包...\n`),
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
