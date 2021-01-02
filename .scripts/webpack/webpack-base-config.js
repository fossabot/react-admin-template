const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const postcssNormalize = require('postcss-normalize');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const { buildEnv, bundleAnalyze, appPublicPath, useSourceMap } = require('../config');
const paths = require('../config/paths');
const pkg = require(paths.appRootPkgJson);
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
		isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
		{
			loader: 'css-loader',
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
			loader: 'postcss-loader',
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
				loader: 'less-loader',
				options: {
					sourceMap: canUseSourceMap,
					lessOptions: {
						modifyVars: antdThemeVars,
						javascriptEnabled: true,
					},
				},
			},
			{
				loader: 'style-resources-loader',
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
					'thread-loader',
					{
						loader: 'babel-loader',
						options: {
							cacheDirectory: true,
						},
					},
				],
			},
			{
				test: /\.css$/,
				use: getStyleLoaders(true, false),
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
		],
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
		alias: {
			'@': path.join(paths.appRootPath, './src'),
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
			cache: true,
			cwd: paths.appRootPath,
			resolvePluginsRelativeTo: __dirname,
		}),
		new StylelintPlugin({
			fix: true,
			cache: true,
			quiet: true,
			files: ['src/**/*.(le|c)ss'],
		}),
		new webpack.DefinePlugin({
			'process.env.BUILD_ENV': JSON.stringify(process.env.BUILD_ENV),
			'process.env.__APP_NAME__': JSON.stringify(pkg.name),
			'process.env.__APP_VERSION__': JSON.stringify(pkg.version),
			'process.env.__APP_BUILD_TIME__': JSON.stringify(new Date().toLocaleString()),
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
