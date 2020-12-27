const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');

const webpackBaseConfig = require('./webpack-base-config');
const { buildEnv, useSourceMap } = require('../config');
const isProduction = buildEnv === 'production';
const isProductionProfile = isProduction && process.argv.includes('--profile');
const canUseSourceMap = isProduction ? useSourceMap : true;

const webpackPubConfig = {
	mode: 'production',
	bail: isProduction,
	devtool: canUseSourceMap ? 'source-map' : false,
	plugins: [],
	optimization: {
		usedExports: true,
		// splitChunks: {
		// 	chunks: 'all',
		// 	minChunks: 1,
		// 	minSize: 10000,
		// 	maxAsyncRequests: 5,
		// 	maxInitialRequests: 3,
		// 	automaticNameDelimiter: '~',
		// 	name: true,
		// 	cacheGroups: {
		// 		common: {
		// 			test: /[\\/]node_modules[\\/]/,
		// 			name: 'vendors',
		// 			minChunks: 2,
		// 			priority: 1,
		// 		},
		// 		styles: {
		// 			name: 'styles',
		// 			test: /\/src\/components\/.*\.less|css$/,
		// 			priority: 10,
		// 		},
		// 	},
		// },
		minimizer: [
			new TerserPlugin({
				exclude: /\.min\.js$/,
				cache: true,
				parallel: true,
				sourceMap: canUseSourceMap,
				extractComments: true,
				terserOptions: {
					compress: {
						ecma: 5,
						inline: 2,
						unused: true,
						warnings: false,
						comparisons: false,
						drop_console: isProduction,
						drop_debugger: true,
					},
					keep_classnames: isProductionProfile,
					keep_fnames: isProductionProfile,
					mangle: {
						safari10: true,
					},
					output: {
						ecma: 5,
						comments: false,
						ascii_only: true,
					},
				},
			}),
			new CssMinimizerWebpackPlugin({
				sourceMap: canUseSourceMap,
			}),
			// new OptimizeCssAssetsPlugin({
			// 	map: false,
			// 	assetNameRegExp: /\.css$/g,
			// 	cssProcessor: require('cssnano'),
			// 	cssProcessorOptions: {
			// 		safe: true,
			// 		autoprefixer: { disable: false },
			// 		mergeLonghand: false,
			// 		discardComments: {
			// 			removeAll: true,
			// 		},
			// 	},
			// 	canPrint: true,
			// }),
		],
		splitChunks: {
			chunks: 'all',
			name: false,
		},
		runtimeChunk: {
			name: entrypoint => `runtime-${entrypoint.name}`,
		},
	},
};

module.exports = webpackMerge(webpackBaseConfig, webpackPubConfig);
