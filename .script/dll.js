const fs = require('fs');
const chalk = require('chalk');
const webpack = require('webpack');
const webpackDllConfig = require('./webpack/webpack-dll-config');

const {
	paths: { appRootPath, appDllPath },
} = require('./config');
const { dependencies } = require(`${appRootPath}/package.json`);

function dllCompiler() {
	return new Promise(resolve => {
		webpack(webpackDllConfig, function (err, stats) {
			if (err) throw err;

			process.stdout.write(
				stats.toString({
					colors: true,
					modules: false,
					children: false,
					chunks: false,
					chunkModules: false,
				}),
			);
			console.log();
			console.log();
			console.log(chalk.grey(' 写入依赖...'));
			fs.writeFileSync(`${appDllPath}/dependencies.json`, JSON.stringify(dependencies, null, 2));
			console.log(chalk.grey(' 依赖写入成功！'));
			console.log();
			console.log(` ${chalk.bold(`${chalk.green('✔')}`)} ${chalk.cyan('dll构建完成!')}`);
			console.log();
			resolve();
		});
	});
}

module.exports = dllCompiler;
