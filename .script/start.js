require('./helper/complier-pass-check')();
const chalk = require('chalk');
const dllCompiler = require('./dll');
const dllCheck = require('./helper/dll-check');

(async function dev() {
	const flag = dllCheck();
	if (flag) {
		console.log(chalk.grey(' 检查完毕，项目启动中...'));
		console.log();
		require('./dev');
	} else {
		console.log(chalk.grey(' 检查完毕，dll未构建或已过期，即将自动构建...'));
		await dllCompiler();
		console.log(chalk.grey(' 项目启动中...'));
		console.log();
		require('./dev');
	}
})();
