module.exports = {
	plugins: [
		['@babel/plugin-proposal-decorators', { legacy: true }],
		['@babel/plugin-proposal-class-properties', { loose: true }],
		['@babel/plugin-transform-runtime', { corejs: { version: 3, proposals: true } }],
		'syntax-async-functions',
		'@babel/plugin-syntax-dynamic-import',
		'@babel/plugin-transform-async-to-generator',
		'@babel/plugin-transform-regenerator',
		'@babel/plugin-transform-modules-commonjs',
		'@babel/plugin-syntax-import-meta',
		'@babel/plugin-proposal-json-strings',
		'@babel/plugin-proposal-function-sent',
		'@babel/plugin-proposal-export-namespace-from',
		'@babel/plugin-proposal-numeric-separator',
		'@babel/plugin-proposal-throw-expressions',
		'@babel/plugin-proposal-optional-chaining',
		'react-hot-loader/babel',
		[
			'import',
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
				useBuiltIns: 'entry',
				corejs: {
					version: 3,
					proposals: true,
				},
			},
		],
		[
			'react-app',
			{
				flow: false,
				typescript: true,
			},
		],
	],
};
