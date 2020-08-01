/**
 * 目前仅用于接口请求的提示，考虑到功能简单，没有使用React方法渲染与卸载
 */

import styles from './index.module.less';

export default class VanillaLoading {
	private isLoading: boolean;
	private el: HTMLElement | null;
	constructor() {
		this.isLoading = false;
		this.el = null;
	}

	show() {
		if (this.isLoading) return;
		this.isLoading = true;
		const dom = document.createElement('div');
		dom.innerHTML = `<div class="${styles['loading-mask']}"></div>`;
		this.el = dom;
		document.body.appendChild(dom);
	}

	hide() {
		if (!this.isLoading) return;
		this.isLoading = false;
		if (this.el && this.el.parentNode) {
			this.el.parentNode.removeChild(this.el);
		}
	}
}
