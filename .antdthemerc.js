const { getThemeVariables } = require('antd/dist/theme');

// https://ant.design/docs/react/customize-theme-cn
// 目前将css文件全量引入，如果启用此项需确保less-loader版本小于等于6.2.0，同时删除全量引用
module.exports = {
	enable: false,
	antdThemeVars: getThemeVariables({
		dark: true,
		compact: true,
	}),
};
