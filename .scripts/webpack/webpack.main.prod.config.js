const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const ESLintPlugin = require('eslint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const {
	buildTime,
	buildEnv,
	name,
	version,
	gitBranch,
	gitCommitHash,
} = require('../config');
const paths = require('../config/paths');
const isProduction = buildEnv === 'production';

const webpackMainProdConfig = {
	mode: process.env.NODE_ENV,
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
		extensions: ['.js', '.json', '.node'],
	},
	plugins: [
		new WebpackBar({
			profile: true,
		}),
		new CleanWebpackPlugin({ verbose: true }),
		new ESLintPlugin({
			extensions: ['js', 'jsx', 'ts', 'tsx'],
			formatter: require.resolve('react-dev-utils/eslintFormatter'),
			eslintPath: require.resolve('eslint'),
			context: paths.appRenderSrc,
			cache: false,
			cwd: paths.appRootPath,
			resolvePluginsRelativeTo: __dirname,
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
			'process.env.BUILD_ENV': JSON.stringify(buildEnv),
			'process.env.$__APP_NAME__$': JSON.stringify(name),
			'process.env.$__APP_VERSION__$': JSON.stringify(version),
			'process.env.$__GIT_BRANCH__$': JSON.stringify(gitBranch),
			'process.env.$__GIT_COMMIT_HASH__$': JSON.stringify(gitCommitHash),
			'process.env.$__APP_BUILD_TIME__$': JSON.stringify(buildTime),
		}),
	],
	node: {
		__dirname: process.env.NODE_ENV !== 'production',
		__filename: process.env.NODE_ENV !== 'production',
	},
};

module.exports = webpackMainProdConfig;
