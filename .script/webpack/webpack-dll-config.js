const path = require('path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const { dll, paths } = require('../config');
const pkg = require(paths.appPackageJson);

// 不被DllPlugin支持的包
const excludePackages = ['@babel/runtime', '@babel/runtime-corejs3'];

module.exports = {
	devtool: 'cheap-module-source-map',
	mode: 'development',
	entry: {
		[dll.entryKey]: Object.keys(pkg.dependencies).filter(key => !excludePackages.includes(key)),
	},
	output: {
		path: paths.appDllPath,
		filename: dll.filename,
		library: dll.library,
	},
	plugins: [
		new WebpackBar({
			profile: true,
		}),
		new CleanWebpackPlugin(),
		new webpack.DllPlugin({
			context: __dirname,
			path: path.join(paths.appDllPath, dll.manifest),
			name: dll.library,
		}),
	],
};
