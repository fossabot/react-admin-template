const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

const { dllConfig } = require('../config');
const paths = require('../config/paths');
const webpackBaseConfig = require('./webpack-base-config');

const webpackDevConfig = {
	mode: 'development',
	devtool: 'cheap-module-source-map',
	output: {
		filename: '[name].js',
		publicPath: '/',
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
	],
};

if (
	fs.existsSync(path.resolve(paths.appDllPath, dllConfig.filename)) &&
	fs.existsSync(path.resolve(paths.appDllPath, dllConfig.manifest))
) {
	webpackDevConfig.plugins.push(
		new webpack.DllReferencePlugin({
			context: __dirname,
			manifest: require(path.resolve(paths.appDllPath, dllConfig.manifest)),
		}),
		new AddAssetHtmlWebpackPlugin({
			filepath: require.resolve(path.resolve(paths.appDllPath, dllConfig.filename)),
		}),
	);
}

const config = webpackMerge(webpackBaseConfig, webpackDevConfig);

Object.keys(config.entry).forEach(function (name) {
	config.entry[name].unshift('webpack-hot-middleware/client?timeout=200&overlay=true&reload=true');
});

module.exports = config;
