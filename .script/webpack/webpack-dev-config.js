const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

const { dll, paths } = require('../config');
const webpackBaseConfig = require('./webpack-base-config');

const webpackDevConfig = {
	devtool: 'cheap-module-source-map',
	mode: 'development',
	output: {
		filename: '[name].js',
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
		alias: {
			// 'react-dom': '@hot-loader/react-dom',
		},
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
	],
};

if (
	fs.existsSync(path.resolve(paths.appDllPath, dll.filename)) &&
	fs.existsSync(path.resolve(paths.appDllPath, dll.manifest))
) {
	webpackDevConfig.plugins.push(
		new webpack.DllReferencePlugin({
			context: __dirname,
			manifest: require(path.resolve(paths.appDllPath, dll.manifest)),
		}),
		new AddAssetHtmlWebpackPlugin({
			filepath: require.resolve(path.resolve(paths.appDllPath, dll.filename)),
		}),
	);
}

const config = webpackMerge(webpackBaseConfig, webpackDevConfig);

Object.keys(config.entry).forEach(function (name) {
	config.entry[name].unshift('webpack-hot-middleware/client?timeout=200&overlay=true&reload=true');
});

module.exports = config;
