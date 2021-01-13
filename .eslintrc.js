const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
	root: true,
	settings: {
		'import/ignore': ['node_modules'],
		react: {
			pragma: 'React',
			version: '17.0.1',
			createClass: 'createReactClass',
		},
	},
	env: {
		browser: true,
		commonjs: true,
		es6: true,
		node: true,
	},
	globals: {
		document: true,
		window: true,
		process: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2018,
		ecmaFeatures: {
			experimentalObjectRestSpread: true,
			legacyDecorators: true,
			jsx: true,
		},
		sourceType: 'module',
		project: './tsconfig.json',
		tsconfigRootDir: __dirname,
		warnOnUnsupportedTypeScriptVersion: true,
	},
	extends: [
		'airbnb',
		'prettier',
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:import/typescript',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'prettier/react',
	],
	plugins: ['react', 'babel', '@typescript-eslint', 'react-hooks', 'unicorn'],
	overrides: [
		{
			files: ['*.js', '*.jsx'],
			rules: {
				'@typescript-eslint/unbound-method': OFF,
				'@typescript-eslint/no-unsafe-call': OFF,
				'@typescript-eslint/no-misused-promises': OFF,
				'@typescript-eslint/no-floating-promises': OFF,
				'@typescript-eslint/no-unsafe-member-access': OFF,
				'@typescript-eslint/explicit-function-return-type': OFF,
				'@typescript-eslint/restrict-template-expressions': OFF,
				'@typescript-eslint/explicit-module-boundary-types': OFF,
			},
		},
	],
	rules: {
		semi: ERROR,
		quotes: ERROR,
		indent: [ERROR, 'tab', { SwitchCase: 1, ObjectExpression: 1 }],
		radix: ERROR,
		'one-var': OFF,
		'func-names': ERROR,
		'global-require': OFF,
		'prefer-destructuring': OFF,
		'object-curly-spacing': ERROR,

		'no-var': ERROR,
		'no-tabs': OFF,
		'no-proto': ERROR,
		'no-alert': ERROR,
		'no-undef': ERROR,
		'no-empty': ERROR,
		'no-console': process.env.NODE_ENV === 'production' ? WARN : OFF,
		'no-plusplus': ERROR,
		'no-shadow': WARN,
		'no-bitwise': ERROR,
		'no-debugger': ERROR,
		'no-script-url': ERROR,
		'no-iterator': ERROR,
		'no-lonely-if': ERROR,
		'no-unused-vars': OFF,
		'no-new-object': ERROR,
		'no-undef-init': ERROR,
		'no-multi-assign': ERROR,
		'no-else-return': ERROR,
		'no-return-assign': ERROR,
		'no-unreachable': ERROR,
		'no-return-await': ERROR,
		'no-self-compare': ERROR,
		'no-param-reassign': [ERROR, { props: false }],
		'no-mixed-operators': ERROR,
		'no-useless-concat': ERROR,
		'no-nested-ternary': ERROR,
		'no-useless-return': ERROR,
		'no-use-before-define': OFF,
		'no-underscore-dangle': WARN,
		'no-unneeded-ternary': ERROR,
		'no-restricted-syntax': WARN,
		'no-unused-expressions': ERROR,
		'no-this-before-super': ERROR,
		'no-constant-condition': ERROR,
		'no-whitespace-before-property': ERROR,

		'arrow-parens': ERROR,
		'arrow-spacing': ERROR,
		'arrow-body-style': OFF,

		'max-depth': [ERROR, 2],
		'max-params': [ERROR, 3],
		'max-len': [ERROR, { code: 120 }],
		'max-lines-per-function': [WARN, 120],
		'max-lines': [ERROR, { max: 800, skipBlankLines: true, skipComments: true }],

		'consistent-return': ERROR,
		'object-curly-newline': OFF,
		'class-methods-use-this': WARN,
		'comma-dangle': [ERROR, 'always-multiline'],

		// 'linebreak-style': [ERROR, 'unix'],
		'lines-between-class-members': OFF,

		'import/extensions': OFF,
		'import/no-unresolved': OFF,
		'import/no-dynamic-require': ERROR,
		'import/prefer-default-export': ERROR,
		'import/no-extraneous-dependencies': ERROR,

		'@typescript-eslint/no-var-requires': OFF,
		'@typescript-eslint/no-unused-vars': ERROR,
		'@typescript-eslint/unbound-method': ERROR,
		'@typescript-eslint/no-unsafe-call': ERROR,
		'@typescript-eslint/no-misused-promises': ERROR,
		'@typescript-eslint/no-floating-promises': WARN,
		'@typescript-eslint/no-unsafe-member-access': ERROR,
		'@typescript-eslint/explicit-function-return-type': OFF,
		'@typescript-eslint/restrict-template-expressions': ERROR,
		'@typescript-eslint/explicit-module-boundary-types': OFF,

		'react/no-danger': ERROR,
		'react/no-string-refs': ERROR,
		'react/no-this-in-sfc': ERROR,
		'react/forbid-prop-types': OFF,
		'react/no-array-index-key': ERROR,
		'react/jsx-indent': [ERROR, 'tab'],
		'react/require-default-props': OFF,
		'react-hooks/rules-of-hooks': ERROR,
		'react/jsx-props-no-spreading': OFF,
		'react/destructuring-assignment': OFF,
		'react/jsx-indent-props': [ERROR, 'tab'],
		'react/jsx-one-expression-per-line': ERROR,
		'react/no-access-state-in-setstate': ERROR,
		'react/jsx-wrap-multilines': [ERROR, { declaration: false, assignment: false }],
		'react/jsx-filename-extension': [ERROR, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],

		'jsx-a11y/click-events-have-key-events': OFF,
		'jsx-a11y/no-static-element-interactions': OFF,
	},
};
