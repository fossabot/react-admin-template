module.exports = {
	root: true,
	parser: 'babel-eslint',
	parserOptions: {
		parser: 'babel-eslint',
		sourceType: 'module',
	},
	env: {
		browser: true,
		node: true,
	},
	plugins: ['stylelint-order', 'stylelint-declaration-block-no-ignored-properties'],
	extends: [
		'stylelint-config-standard',
		'stylelint-config-css-modules',
		'stylelint-config-recess-order',
		'stylelint-config-prettier',
	],
	rules: {
		'no-empty-source': null,
		'declaration-no-important': true,
		'color-named': 'never',
		'color-hex-case': 'lower',
		'number-leading-zero': 'always',
		'plugin/declaration-block-no-ignored-properties': true,
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: ['mixin', 'extend', 'content'],
			},
		],
	},
};
