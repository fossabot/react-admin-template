const WebpackBar = require('webpackbar');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const { buildTime, buildEnv, name, version, gitBranch, gitCommitHash } = require('../config');
const paths = require('../config/paths');
// const { dependencies } = require(paths.appRootPkgJson);
const isProduction = buildEnv === 'production';

const envs = {
	NODE_ENV: buildEnv,
	APP_NAME: name,
	APP_VERSION: version,
	GIT_BRANCH: gitBranch,
	GIT_COMMIT_HASH: gitCommitHash,
	APP_BUILD_TIME: buildTime,
};

Object.keys(envs).forEach(key => {
	process.env[key] = envs[key];
});

const webpackMainProdConfig = {
	mode: 'production',
	target: 'electron-main',
	entry: {
		index: [paths.appMainEntry],
	},
	output: {
		globalObject: 'this',
		pathinfo: !isProduction,
		publicPath: '/',
		filename: '[name].js',
		path: paths.appMainDistPath,
	},
	// externals: [...Object.keys(dependencies || {})],
	module: {
		strictExportPresence: true,
		rules: [
			{
				test: /\.(js|ts)$/,
				include: paths.appMainSrc,
				use: [
					require.resolve('thread-loader'),
					{
						loader: require.resolve('babel-loader'),
						options: {
							cacheDirectory: false,
						},
					},
				],
			},
			{
				test: /\.node$/,
				use: 'node-loader',
			},
		],
	},
	resolve: {
		extensions: ['.js', '.ts', '.json', '.node'],
	},
	plugins: [
		new WebpackBar({
			name: 'Electron Main',
			profile: true,
		}),
		new CleanWebpackPlugin({ verbose: true }),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: paths.appMainStatics,
					to: paths.appMainDistStatics,
					globOptions: {
						ignore: ['**/favicon.ico', '**/index.html'],
					},
					noErrorOnMissing: false,
				},
			],
		}),
		new ESLintWebpackPlugin({
			extensions: ['js', 'jsx', 'ts', 'tsx'],
			formatter: require.resolve('react-dev-utils/eslintFormatter'),
			eslintPath: require.resolve('eslint'),
			context: paths.appMainSrc,
			cache: false,
			cwd: paths.appRootPath,
			resolvePluginsRelativeTo: __dirname,
		}),
	],
	node: {
		__dirname: process.env.NODE_ENV !== 'production',
		__filename: process.env.NODE_ENV !== 'production',
	},
};

module.exports = webpackMainProdConfig;
