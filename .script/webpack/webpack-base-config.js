const fs = require('fs');
const path = require('path');
const WebpackBar = require('webpackbar');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const { env, paths, staticSourcePathPrefix: prefix, analyze } = require('../config');
const isDev = env === 'development';
const p = path.resolve(paths.appRootPath, './.antdthemerc.js');
let themeConfig = {};
if (fs.existsSync(p)) themeConfig = require(p);

function getModuleConfig(module) {
	return [
		isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
		{
			loader: 'css-loader',
			options: module
				? {
						modules: isDev
							? {
									getLocalIdent: (context, localIdentName, localName, options) => {
										const resourcePath = context.resourcePath.replace(/\\/g, '/');
										return `${resourcePath.split('/').slice(-5, -1).join('_')}__${localName}`;
									},
							  }
							: true,
				  }
				: {},
		},
		{
			loader: 'postcss-loader',
			options: {
				plugins: [
					require('postcss-flexbugs-fixes'),
					require('autoprefixer')({
						cascade: true,
						overrideBrowserslist: ['Android >= 4', 'Chrome >= 35', 'iOS >= 7', 'Safari >= 7.1'],
					}),
				],
			},
		},
		{
			loader: 'less-loader',
			options: {
				sourceMap: true,
				lessOptions: module
					? {
							javascriptEnabled: true,
					  }
					: {
							modifyVars: themeConfig,
							javascriptEnabled: true,
					  },
			},
		},
		{
			loader: 'style-resources-loader',
			options: {
				patterns: [paths.appGlobalVariables, paths.appGlobalMixins],
				injector: 'append',
			},
		},
	];
}

const webpackBaseConfig = {
	mode: 'production',
	entry: {
		app: [paths.appEntry],
	},
	output: {
		path: paths.appDistPath,
		filename: `${prefix}scripts/[name]-[chunkhash:8].js`,
		publicPath: '/',
	},
	performance: {
		maxEntrypointSize: 512000,
		maxAssetSize: 512000,
	},
	module: {
		rules: [
			{
				test: /\.(js|ts[x])?$/,
				loader: 'eslint-loader',
				enforce: 'pre',
				exclude: /(node_modules|bower_components)/,
				options: {
					cache: true,
					// fix: true,
					formatter: require('eslint-friendly-formatter'),
				},
			},
			{
				test: /\.(js|ts)[x]?$/,
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
				use: [
					isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							plugins: [
								require('postcss-flexbugs-fixes'),
								require('autoprefixer')({
									cascade: true,
									overrideBrowserslist: [
										'Android >= 4',
										'Chrome >= 35',
										'iOS >= 7',
										'Safari >= 7.1',
									],
								}),
							],
						},
					},
				],
			},
			{
				test: /\.module\.less$/,
				exclude: /node_modules/,
				use: getModuleConfig(true),
			},
			{
				test: /\.less$/,
				exclude: /\.module\.less$/,
				use: getModuleConfig(false),
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
				loader: 'url-loader',
				options: {
					limit: 8192,
					name: `${prefix}assets/[name].[hash:8].[ext]`,
				},
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
		alias: {
			'~': path.join(paths.appRootPath, './src'),
			'~apis': path.resolve(paths.appRootPath, './src/apis'),
			'~store': path.resolve(paths.appRootPath, './src/store'),
			'~utils': path.resolve(paths.appRootPath, './src/utils'),
			'~assets': path.resolve(paths.appRootPath, './src/assets'),
			'~routes': path.resolve(paths.appRootPath, './src/routes'),
			'~config': path.resolve(paths.appRootPath, './src/config'),
			'~helper': path.resolve(paths.appRootPath, './src/helper'),
			'~components': path.resolve(paths.appRootPath, './src/components'),
		},
	},
	// externals: {
	//   'react': 'React',
	//   'react-dom': 'ReactDOM',
	// },
	plugins: [
		new WebpackBar({
			profile: true,
		}),
		new StylelintPlugin({
			quiet: true,
			// emitError: true,
			files: ['src/**/*.(le|c)ss'],
		}),
		// new webpack.ProvidePlugin({
		//   'React': 'react',
		// }),
		new MiniCssExtractPlugin({
			filename: `${prefix}styles/[name].[chunkhash:8].css`,
			chunkFilename: `${prefix}styles/[name].[chunkhash:8].css`,
		}),
		new HtmlWebpackPlugin({
			template: paths.appTplHtml,
			favicon: paths.favicon,
			filename: 'index.html',
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true,
			},
		}),
	],
};

analyze && webpackBaseConfig.plugins.unshift(new BundleAnalyzerPlugin());

module.exports = webpackBaseConfig;
