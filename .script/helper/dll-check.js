const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const {
	paths: { appRootPath, appDllPath },
} = require('../config');

function dllCheck() {
	console.log();
	console.log(chalk.grey(' 正在进行启动前检查...'));

	const dllDependenciesPath = path.resolve(appDllPath, 'dependencies.json');
	const dllDependenciesPathExists = fs.existsSync(dllDependenciesPath);

	if (!dllDependenciesPathExists) return false;

	const { dependencies } = require(path.resolve(appRootPath, 'package.json'));
	const dllDependencies = require(dllDependenciesPath);

	if (Object.keys(dllDependencies).length !== Object.keys(dependencies).length) return false;

	return Object.keys(dllDependencies).every(key => dllDependencies[key] === dependencies[key]);
}

module.exports = dllCheck;
