const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');

const webpackDllConfig = require('./webpack/webpack-dll-config');
const { appRootPath, appDllPath, appRootPkgJson } = require('./config/paths');
const { dependencies } = require(appRootPkgJson);

function dllCheck() {
	console.log();
	console.log(chalk.grey(' 正在进行DLL有效性检查...'));

	const dllDependenciesPath = path.resolve(appDllPath, 'dependencies.json');
	const dllDependenciesPathExists = fs.existsSync(dllDependenciesPath);

	if (!dllDependenciesPathExists) return false;

	const { dependencies } = require(path.resolve(appRootPath, 'package.json'));
	const dllDependencies = require(dllDependenciesPath);

	if (Object.keys(dllDependencies).length !== Object.keys(dependencies).length) return false;

	return Object.keys(dllDependencies).every(key => dllDependencies[key] === dependencies[key]);
}

if (dllCheck()) {
	console.log(chalk.yellow(' 本地DLL有效，跳过构建直接复用！'));
	console.log();
	return;
}

webpack(webpackDllConfig, function (webpackError, stats) {
	if (webpackError) {
		throw webpackError;
	}

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

	if (stats.hasErrors()) process.exit(1);

	console.log(chalk.grey(' 写入DLL依赖配置...'));
	fs.writeFileSync(`${appDllPath}/dependencies.json`, JSON.stringify(dependencies, null, 2));
	console.log(chalk.grey(' DLL依赖配置写入成功！'));
	console.log();
	console.log(` ${chalk.bold(`${chalk.green('✔')}`)} ${chalk.cyan('DLL构建完成!')}`);
	console.log();
});
