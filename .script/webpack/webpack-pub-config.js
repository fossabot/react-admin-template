const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const webpackBaseConfig = require('./webpack-base-config');

const webpackPubConfig = {
	mode: 'production',
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
		}),
	],
	optimization: {
		usedExports: true,
		splitChunks: {
			chunks: 'all',
			minChunks: 1,
			minSize: 10000,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			automaticNameDelimiter: '~',
			name: true,
			cacheGroups: {
				common: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					minChunks: 2,
					priority: 1,
				},
				styles: {
					name: 'styles',
					test: /\/src\/components\/.*\.less|css$/,
					priority: 10,
				},
			},
		},
		minimizer: [
			new TerserPlugin({
				exclude: /\.min\.js$/,
				cache: true,
				parallel: true,
				sourceMap: false,
				extractComments: true,
				terserOptions: {
					compress: {
						unused: true,
						drop_console: true,
						drop_debugger: true,
					},
					output: {
						comments: false,
					},
				},
			}),
			new OptimizeCssAssetsPlugin({
				map: false,
				assetNameRegExp: /\.css$/g,
				cssProcessor: require('cssnano'),
				cssProcessorOptions: {
					safe: true,
					autoprefixer: { disable: false },
					mergeLonghand: false,
					discardComments: {
						removeAll: true,
					},
				},
				canPrint: true,
			}),
		],
	},
};

module.exports = webpackMerge(webpackBaseConfig, webpackPubConfig);
