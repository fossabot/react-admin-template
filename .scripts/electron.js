/**
 * electron 开发启动
 * 如果不需要electron又不想其留在项目中，操作如下
 * 1. 删除`./config/paths.js`中electron相关目录配置
 * 2. 删除`./webpack/webpack.main.prod.config.js`
 * 3. 删除根目录下`main`目录
 * 4. 卸载`package.json`文件中的`electron`、`node-loader`
 * 5. 删除本文件
 * 6. 为了好看，在`./config/paths.js`配置web文件打包输出目录`dist/render` -> `dist`
 */

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

process.on('unhandledRejection', (error) => {
	throw error;
});

// check
require('./utils/checkers');

const path = require('path');
const chalk = require('chalk');
const address = require('address');
const express = require('express');
const webpack = require('webpack');
const electron = require('electron');
const portFinder = require('portfinder');
const webpackLog = require('webpack-log');
const { spawn } = require('child_process');
const WebpackDevMiddleware = require('webpack-dev-middleware');
const WebpackHotMiddleware = require('webpack-hot-middleware');
const { createProxyMiddleware } = require('http-proxy-middleware');

const config = require('./config');
const paths = require('./config/paths');
const webpackMainProdConfig = require('./webpack/webpack.main.prod.config');
const webpackRenderDevConfig = require('./webpack/webpack.render.dev.config');
const { printStatsLog, printElectronLog, printInstructions } = require('./utils/printer');

let electronProcess = null;
let isElectronManualRestarting = false;
let hotMiddleware = null;

function startRenderServer() {
	return new Promise(async (resolve, reject) => {
		const compiler = webpack(webpackRenderDevConfig);

		const devMiddleware = WebpackDevMiddleware(compiler, {
			lazy: false,
			logTime: true,
			serverSideRender: false,
			stats: { colors: true },
			publicPath: webpackRenderDevConfig.output.publicPath,
			logger: webpackLog({ name: 'wds', level: 'error' }),
		});

		hotMiddleware = WebpackHotMiddleware(compiler, {
			log: (msg) => console.log(`${chalk.magenta('[HMW]')} ${chalk.green(msg)}`),
		});

		// compiler.hooks.done.tap('done', (stats) => {
		// 	printStatsLog('Renderer', stats);
		// });

		const app = express();
		app.use('/', require('connect-history-api-fallback')());
		app.use(devMiddleware);
		app.use(hotMiddleware);
		app.use(express.static(path.resolve(process.cwd(), './public')));

		Object.keys(config.proxy).forEach((context) => {
			let options = config.proxy[context];
			if (typeof options === 'string') {
				options = { target: options };
			}
			app.use(context, createProxyMiddleware(options.filter || context, options));
		});

		portFinder
			.getPortPromise({
				port: config.port,
			})
			.then((port) => {
				app.listen(port, config.hostName, () => {
					config.port = port;

					let firstTapDone = true;
					const localUrl = `http://localhost:${port}`;
					const networkUrl = `http://${address.ip()}:${port}`;

					compiler.hooks.done.tap('done', () => {
						printInstructions(localUrl, networkUrl);

						if (firstTapDone) {
							firstTapDone = false;
							resolve();
						}
					});
				});
			})
			.catch((err) => {
				console.log(err);
				reject(err);
			});
	});
}

function startElectron() {
	return new Promise((resolve) => {
		electronProcess = spawn(electron, ['--inspect=5858', paths.appMainSrc], {
			env: Object.assign({}, process.env, {
				RENDER_DEV_HOST_NAME: config.hostName === '0.0.0.0' ? 'localhost' : config.hostName,
				RENDER_DEV_PORT: config.port,
			}),
		});

		electronProcess.stdout.on('data', (data) => {
			printElectronLog(data, 'cyan');
		});

		electronProcess.stderr.on('data', (data) => {
			printElectronLog(data, 'red');
		});

		electronProcess.on('close', (code) => {
			if (!isElectronManualRestarting) {
				process.exit(code);
			}
		});

		resolve();
	});
}

function startMainWatcher() {
	let firstTapDone = true;

	return new Promise((resolve, reject) => {
		const compiler = webpack(webpackMainProdConfig);

		compiler.hooks.watchRun.tapAsync('watch-run', (compilation, done) => {
			printStatsLog('Main', chalk.cyan.bold('Main process compiling...'));
			if (hotMiddleware) {
				hotMiddleware.publish({ action: 'compiling' });
			}
			done();
		});

		compiler.watch({}, (err, stats) => {
			if (err) {
				console.log(err);
				// return;
			}
			// printStatsLog('Main', stats);
		});

		compiler.hooks.done.tap('done', (stats) => {
			if (!firstTapDone) {
				printStatsLog('Main', stats);
				firstTapDone = true;
			}

			if (hotMiddleware) {
				hotMiddleware.publish({ action: 'reload' });
			}

			if (stats.hasErrors()) {
				reject(stats);
				return;
			}

			if (electronProcess && electronProcess.kill) {
				isElectronManualRestarting = true;

				process.kill(electronProcess.pid);

				startElectron().then(() => {
					setTimeout(() => {
						isElectronManualRestarting = false;
					}, 10000);
				});
			}
			resolve();
		});
	});
}

// Promise.all([startMainWatcher(), startRenderServer()])
// 	.then(async () => {
// 		await startElectron();
// 		console.log(chalk.grey(' 启动成功'));
// 	})
// 	.catch(() => {
// 		console.log(chalk.red(' 启动失败！请检查startRenderServer或startMainWatcher是否有异常'));
// 		process.exit(1);
// 	});

async function start() {
	await startMainWatcher();
	printStatsLog('Main', chalk.green(' Main Process Ready'));

	await startRenderServer();
	printStatsLog('Render', chalk.green(' Render Process Ready'));

	await startElectron();
	printStatsLog('Electron', chalk.green(' Electron Process Ready'));
}

start().then(() => {
	printStatsLog('APP', chalk.green(' All Ready'));
}).catch(() => {
	printStatsLog('Unknown', chalk.red(' 启动失败！请检查startRenderServer、startMainWatcher、startElectron是否有异常'));
});
