const { getThemeVariables } = require('antd/dist/theme');

// https://ant.design/docs/react/customize-theme-cn
// 如果启用此项`babel-plugin-import`需要设置`style: true`以使用`less`，同时需需要`less-loader`版本小于等于`6.2.0`
module.exports = {
	enable: true,
	antdThemeVars: {
		...getThemeVariables({
			dark: false,
			compact: false,
		}),
		// 其他变量，eg.
		// 'primary-color': '#f90',
		'layout-header-background': '#1f1f1f',
		'menu-dark-bg': '#1f1f1f',
		'menu-popup-bg': '#1f1f1f',
		'menu-dark-inline-submenu-bg': '#141414',
	},
};
