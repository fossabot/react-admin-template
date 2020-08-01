/**
 * 全局状态
 * 为便于阅读细分类型的全局状态可以新建状态文件
 */
import { observable, action } from 'mobx';

interface ILayoutConfig {
	menuPosition: 'header' | 'aside'; // 目前只有'header', 'aside'
	collapsed: boolean; // 只有'aside'才会生效
}

class Global {
	@observable systemTitleName = '项目模板'; // 系统名称
	@observable layoutConfig: ILayoutConfig = {
		menuPosition: 'aside',
		collapsed: false,
	};
	@observable theme = 'dark'; // 主题类型

	/**
	 * 设置侧边栏折叠状态
	 * @param config
	 */
	@action.bound
	onSetLayoutConfig(config: ILayoutConfig) {
		this.layoutConfig = { ...this.layoutConfig, ...config };
	}

	/**
	 * 切换主题
	 * @param {String} theme
	 */
	@action.bound
	onChangeTheme(theme: string) {
		this.theme = theme;
		document.body.setAttribute('data-theme', theme);
	}
}

module.exports = new Global();
