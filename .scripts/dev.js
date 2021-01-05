process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

process.on('unhandledRejection', (error) => {
	throw error;
});

// check
require('./utils/checkers');

const path = require('path');
const open = require('open');
const chalk = require('chalk');
const address = require('address');
const express = require('express');
const webpack = require('webpack');
const portFinder = require('portfinder');
const webpackLog = require('webpack-log');
const WebpackDevMiddleware = require('webpack-dev-middleware');
const WebpackHotMiddleware = require('webpack-hot-middleware');
const { createProxyMiddleware } = require('http-proxy-middleware');

const config = require('./config');
const webpackConfig = require('./webpack/webpack-dev-config');
const { printInstructions } = require('./utils/printer');
const compiler = webpack(webpackConfig);

const devMiddleware = WebpackDevMiddleware(compiler, {
	lazy: false,
	logTime: true,
	serverSideRender: false,
	stats: { colors: true },
	publicPath: webpackConfig.output.publicPath,
	logger: webpackLog({ name: 'wds', level: 'error' }),
});
const hotMiddleware = WebpackHotMiddleware(compiler, {
	log: (msg) => console.log(`${chalk.magenta('[HMW]')} ${chalk.green(msg)}`),
});

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
		let first = true;
		app.listen(port, config.hostName, () => {
			const localUrl = `http://localhost:${port}`;
			const networkUrl = `http://${address.ip()}:${port}`;

			compiler.hooks.done.tap('done', () => {
				if (first) {
					first = false;
					open(localUrl);
				}
				printInstructions(localUrl, networkUrl);
			});
		});
	})
	.catch((err) => {
		console.log(err);
	});
