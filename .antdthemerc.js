const { getThemeVariables } = require('antd/dist/theme');

// https://ant.design/docs/react/customize-theme-cn
// 如果启用此项或者使用了babel-plugin-import，需确保less-loader版本小于等于6.2.0
module.exports = {
	enable: true,
	antdThemeVars: {
		...getThemeVariables({
			dark: true,
			compact: false,
		}),
		// 其他变量，eg.
		// 'primary-color': '#f90',
	},
};
