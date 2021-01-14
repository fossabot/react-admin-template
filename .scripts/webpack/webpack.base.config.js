const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const threadLoader = require('thread-loader');
const postcssNormalize = require('postcss-normalize');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

threadLoader.warmup({}, ['babel-loader', 'css-loader', 'postcss-loader', 'less-loader']);

const {
	buildTime,
	buildEnv,
	bundleAnalyze,
	appPublicPath,
	useSourceMap,

	name,
	version,
	gitBranch,
	gitCommitHash,
} = require('../config');
const paths = require('../config/paths');
const isDevelopment = buildEnv === 'development';
const isProduction = buildEnv === 'production';
const canUseSourceMap = isProduction ? useSourceMap : true;

// antd theme
let antdThemeVars = {};
const antdThemeRcPath = path.resolve(paths.appRootPath, './.antdthemerc.js');
if (fs.existsSync(antdThemeRcPath)) {
	const antdThemeConfig = require(antdThemeRcPath);
	if (antdThemeConfig.enable) {
		antdThemeVars = antdThemeConfig.antdThemeVars;
	}
}

function getCSSModuleLocalIdent(context, localIdentName, localName, options) {
	const resourcePath = context.resourcePath.replace(/\\/g, '/');
	return `${resourcePath.split('/').slice(-5, -1).join('_')}__${localName}`;
}

function getStyleLoaders(useCssModule, isLessLoader) {
	const loaders = [
		isDevelopment ? require.resolve('style-loader') : MiniCssExtractPlugin.loader,
		require.resolve('thread-loader'),
		{
			loader: require.resolve('css-loader'),
			options: useCssModule
				? {
						modules: isDevelopment
							? {
									getLocalIdent: getCSSModuleLocalIdent,
							  }
							: true,
				  }
				: {},
		},
		{
			loader: require.resolve('postcss-loader'),
			options: {
				sourceMap: canUseSourceMap,
				postcssOptions: {
					plugins: [
						require('postcss-flexbugs-fixes'),
						require('postcss-preset-env')({
							autoprefixer: {
								flexbox: 'no-2009',
							},
							stage: 3,
						}),
						postcssNormalize(),
					],
				},
			},
		},
	];

	if (isLessLoader) {
		loaders.push(
			{
				loader: require.resolve('resolve-url-loader'),
				options: {
					sourceMap: canUseSourceMap,
					root: paths.appSrc,
				},
			},
			{
				loader: require.resolve('less-loader'),
				options: {
					sourceMap: canUseSourceMap,
					lessOptions: {
						modifyVars: antdThemeVars,
						javascriptEnabled: true,
					},
				},
			},
			{
				loader: require.resolve('style-resources-loader'),
				options: {
					patterns: [paths.globalLessVariables, paths.globalLessMixins],
					injector: 'append',
				},
			},
		);
	}
	return loaders;
}

const webpackBaseConfig = {
	target: 'web',
	entry: {
		app: [paths.appEntry],
	},
	output: {
		globalObject: 'this',
		pathinfo: !isProduction,
		path: paths.appDistPath,
		publicPath: appPublicPath,
		filename: 'statics/scripts/[name]-[chunkhash:8].js',
		chunkFilename: 'statics/scripts/[name]-[chunkhash:8].chunk.js',
	},
	module: {
		strictExportPresence: true,
		rules: [
			{
				test: /\.(js|jsx|ts|tsx)$/,
				include: paths.appSrc,
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
				test: /\.css$/,
				use: getStyleLoaders(false, false),
			},
			{
				test: /\.module\.css$/,
				exclude: /\.module\.css$/,
				use: getStyleLoaders(true, false),
			},
			{
				test: /\.less$/,
				exclude: /\.module\.less$/,
				use: getStyleLoaders(false, true),
			},
			{
				test: /\.module\.less$/,
				exclude: /node_modules/,
				use: getStyleLoaders(true, true),
			},
			{
				test: /\.(png|jpg|jpeg|bmp|gif)$/,
				loader: require.resolve('url-loader'),
				options: {
					limit: 10240,
					name: 'statics/assets/[name].[hash:8].[ext]',
				},
			},
			{
				test: /\.svg$/,
				include: paths.svgIconPath,
				loader: require.resolve('svg-sprite-loader'),
				options: { symbolId: 'icon-[name]' },
			}
		],
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
		alias: {
			'@': paths.appSrc,
		},
	},
	plugins: [
		new WebpackBar({
			profile: true,
		}),
		new ESLintPlugin({
			extensions: ['js', 'jsx', 'ts', 'tsx'],
			formatter: require.resolve('react-dev-utils/eslintFormatter'),
			eslintPath: require.resolve('eslint'),
			context: paths.appSrc,
			cache: false,
			cwd: paths.appRootPath,
			resolvePluginsRelativeTo: __dirname,
		}),
		new StylelintPlugin({
			fix: true,
			cache: false,
			quiet: true,
			context: paths.appSrc,
			files: ['**/*.(le|c)ss'],
		}),
		new webpack.DefinePlugin({
			'process.env.BUILD_ENV': JSON.stringify(buildEnv),
			'process.env.$__APP_NAME__$': JSON.stringify(name),
			'process.env.$__APP_VERSION__$': JSON.stringify(version),
			'process.env.$__GIT_BRANCH__$': JSON.stringify(gitBranch),
			'process.env.$__GIT_COMMIT_HASH__$': JSON.stringify(gitCommitHash),
			'process.env.$__APP_BUILD_TIME__$': JSON.stringify(buildTime),
		}),
		new HtmlWebpackPlugin(
			Object.assign(
				{},
				{
					inject: true,
					publicPath: appPublicPath,
					template: paths.appHtml,
				},
				isProduction
					? {
							minify: {
								removeComments: true,
								collapseWhitespace: true,
								removeRedundantAttributes: true,
								useShortDoctype: true,
								removeEmptyAttributes: true,
								removeStyleLinkTypeAttributes: true,
								keepClosingSlash: true,
								minifyJS: true,
								minifyCSS: true,
								minifyURLs: true,
							},
					  }
					: undefined,
			),
		),
	],
	performance: {
		maxEntrypointSize: 512000,
		maxAssetSize: 512000,
	},
};

bundleAnalyze && webpackBaseConfig.plugins.unshift(new BundleAnalyzerPlugin());

module.exports = webpackBaseConfig;
