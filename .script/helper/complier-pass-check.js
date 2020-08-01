/**
 * 这个文件会被自动格式化的有点乱，不过这个文件其实也没啥用。
 * 防止非法的启动方式，此处二次验证。
 */

const chalk = require('chalk');
const semver = require('semver');
const paths = require('../config/paths');
const { name: projectName, engines } = require(paths.appPackageJson);
const currentNodeVersion = process.version;
const requiredNodeVersion = engines.node;

module.exports = () => {
	// 不要在意这段代码啥用，其实这个文件都没啥用。
	if (!semver.satisfies(currentNodeVersion, requiredNodeVersion)) {
		console.log();
		console.log(
			chalk.red.bold(`  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━升级提醒━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`),
		);
		console.log(
			chalk.red.bold(`  ┃                                                                     ┃`),
		);
		console.log(
			chalk.red.bold(
				`  ┃            ${chalk.gray(
					`一般情况下我不会出现, 除非你的node版本有问题`,
				)}             ┃`,
			),
		);
		console.log(
			chalk.red.bold(`  ┃                                                                     ┃`),
		);
		console.log(
			chalk.red.bold(
				`  ┏━━━━━━━━━━━━━━━━━━━━━━━ ${chalk.yellow(
					`${projectName.toUpperCase()} WARNING`,
				)} ━━━━━━━━━━━━━━━━━━━━━━━━┓`,
			),
		);
		console.log(
			chalk.red.bold(`  ┃                                                                     ┃`),
		);
		console.log(
			chalk.red.bold(
				`  ┃                        ${chalk.cyan(
					`你的${chalk.red('node')}版本`,
				)}${currentNodeVersion}                          ┃`,
			),
		);
		console.log(
			chalk.red.bold(`  ┃                                                                     ┃`),
		);
		console.log(
			chalk.red.bold(
				`  ┃                        ${chalk.cyan(
					`期望${chalk.red('node')}版本`,
				)}${requiredNodeVersion}                        ┃`,
			),
		);
		console.log(
			chalk.red.bold(`  ┃                                                                     ┃`),
		);
		console.log(
			chalk.red.bold(
				`  ┃          ${chalk.cyan(`为了正常的参与开发, 请先升级你的node到合适版本`)}   	        ┃`,
			),
		);
		console.log(
			chalk.red.bold(`  ┃                                                                     ┃`),
		);
		console.log(
			chalk.red.bold(`  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`),
		);

		process.exit(1);
	}

	// 不要在意这段代码啥用，其实这个文件都没啥用。
	if (process.env.NODE_ENV === undefined) {
		console.log();
		console.log(
			chalk.red.bold(`  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━启动姿势非法━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`),
		);
		console.log(
			chalk.red.bold(`  ┃                                                                     ┃`),
		);
		console.log(
			chalk.red.bold(
				`  ┃     ${chalk.yellow(
					'请不要通过【node ./.script/dev.js】的方式启动项目，很累的!',
				)}      ┃`,
			),
		);
		console.log(
			chalk.red.bold(`  ┃                                                                     ┃`),
		);
		console.log(
			chalk.red.bold(
				`  ┏━━━━━━━━━━━━━━━━━━━━━━━━ ${chalk.red(
					`${projectName.toUpperCase()} ERROR`,
				)} ━━━━━━━━━━━━━━━━━━━━━━━━━┓`,
			),
		);
		console.log(
			chalk.red.bold(`  ┃                                                                     ┃`),
		);
		console.log(
			chalk.red.bold(
				`  ┃                              ${chalk.cyan(
					`友情提示`,
				)}                               ┃`,
			),
		);
		console.log(
			chalk.red.bold(`  ┃                                                                     ┃`),
		);
		console.log(
			chalk.red.bold(
				`  ┃                          ${chalk.cyan(
					`你的${chalk.red('启动姿势')}不对`,
				)}                           ┃`,
			),
		);
		console.log(
			chalk.red.bold(`  ┃                                                                     ┃`),
		);
		console.log(
			chalk.red.bold(
				`  ┃             ${chalk.cyan(
					`为了正常的参与开发, 请从启动脚本启动此项目!`,
				)}             ┃`,
			),
		);
		console.log(
			chalk.red.bold(`  ┃                                                                     ┃`),
		);
		console.log(
			chalk.red.bold(`  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`),
		);

		process.exit(1);
	}
};
