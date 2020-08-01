module.exports = {
	root: true,
	parser: 'babel-eslint',
	parserOptions: {
		parser: 'babel-eslint',
		sourceType: 'module',
	},
	env: {
		browser: true, // 开发环境配置表示可以使用浏览器的方法
		node: true,
	},
	extends: [
		'stylelint-config-standard',
		'stylelint-config-css-modules',
		'stylelint-config-recess-order',
		'stylelint-config-prettier',
	],
	plugins: ['stylelint-order', 'stylelint-declaration-block-no-ignored-properties'],
	rules: {
		'declaration-no-important': true,
		'color-named': 'never',
		'color-hex-case': 'lower',
		'number-leading-zero': null,
		'plugin/declaration-block-no-ignored-properties': true,
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: ['mixin', 'extend', 'content'],
			},
		],
	},
};
