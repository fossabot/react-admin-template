const WebpackBar = require('webpackbar');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const { buildEnv } = require('../../config');
const paths = require('../../config/paths');
const { dependencies, devDependencies } = require(paths.appRootPkgJson);
const isDevelopment = buildEnv === 'development';
const isProduction = buildEnv === 'production';

const webpackProdConfig = {
	mode: 'production',
	target: 'electron-main',
	entry: {
		index: [paths.appElectronEntry],
	},
	output: {
		globalObject: 'this',
		pathinfo: !isProduction,
		publicPath: '/',
		filename: '[name].js',
		path: paths.appElectronDistPath,
	},
	externals: isDevelopment ? [] : [...Object.keys(dependencies || {}), ...Object.keys(devDependencies || {})],
	module: {
		strictExportPresence: true,
		rules: [
			{
				test: /\.(js|ts)$/,
				include: paths.appElectronSrc,
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
		alias: {
			'~': paths.appElectronSrc,
		},
	},
	plugins: [
		new WebpackBar({
			name: 'Electron Main',
			profile: true,
		}),
		new ForkTsCheckerWebpackPlugin({
			typescript: {
				enabled: true,
				async: isDevelopment,
				mode: 'write-references',
				configFile: paths.appTsConfig,
				diagnosticOptions: {
					syntactic: true,
					semantic: true,
					declaration: true,
					global: true,
				},
			},
		}),
		new ESLintWebpackPlugin({
			extensions: ['js', 'jsx', 'ts', 'tsx'],
			formatter: require.resolve('react-dev-utils/eslintFormatter'),
			eslintPath: require.resolve('eslint'),
			context: paths.appElectronSrc,
			cache: false,
			cwd: paths.appRootPath,
			resolvePluginsRelativeTo: __dirname,
		}),
		// new CleanWebpackPlugin({
		// 	// verbose: true,
		// }),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: paths.appElectronStatics,
					to: paths.appElectronDistStatics,
					globOptions: {
						ignore: ['**/favicon.ico', '**/index.html'],
					},
					noErrorOnMissing: false,
				},
			],
		}),
	],
	node: {
		__dirname: process.env.NODE_ENV !== 'production',
		__filename: process.env.NODE_ENV !== 'production',
	},
};

module.exports = webpackProdConfig;
