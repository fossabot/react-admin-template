module.exports = {
	plugins: [
		// 必须在下面那个之前，legacy为true下面那个loose必须为true
		['@babel/plugin-proposal-decorators', { legacy: true }],
		// 必须在上面那个之后，上面那个legacy为true，则loose必须为true
		['@babel/plugin-proposal-class-properties', { loose: true }],
		['@babel/plugin-transform-runtime', { corejs: { version: 3, proposals: true } }],
		'@babel/plugin-syntax-dynamic-import',
		'@babel/plugin-proposal-export-namespace-from',
		'@babel/plugin-proposal-optional-chaining',
		'@babel/plugin-transform-async-to-generator',
		'@babel/plugin-transform-regenerator',
		'@babel/plugin-transform-modules-commonjs',
		// 'syntax-async-functions',
		// '@babel/plugin-proposal-function-sent',
		// '@babel/plugin-syntax-import-meta',
		// '@babel/plugin-proposal-json-strings',
		// '@babel/plugin-proposal-numeric-separator',
		// '@babel/plugin-proposal-throw-expressions',
		'react-hot-loader/babel',
		[
			'babel-plugin-import',
			{
				libraryName: 'antd',
				libraryDirectory: 'es',
				style: true,
			},
		],
	],
	presets: [
		'@babel/preset-typescript',
		'@babel/preset-react',
		[
			'@babel/preset-env',
			{
				useBuiltIns: 'usage',
				corejs: {
					version: 3,
					proposals: true,
				},
			},
		],
		[
			'babel-preset-react-app',
			{
				flow: false,
				typescript: true,
			},
		],
	],
};
