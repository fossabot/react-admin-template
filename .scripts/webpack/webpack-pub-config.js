const webpackMerge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
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
		],
		splitChunks: {
			chunks: 'all',
			name: false,
		},
		runtimeChunk: {
			name: (entrypoint) => `runtime-${entrypoint.name}`,
		},
	},
};

module.exports = webpackMerge(webpackBaseConfig, webpackPubConfig);
