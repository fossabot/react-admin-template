/**
 * 状态入口文件
 */

const store: { [propName: string]: any } = {};
const context = require.context('./', false, /\.js|\.ts$/);
const keys = context
	.keys()
	.filter((item: string) => item !== './index.ts' && item !== './interface.ts');

keys.forEach((item: string) => {
	// const attr = item.match(/([^/]+)(\.js|\.ts)$/);
	const attr = /([^/]+)(\.js|\.ts)$/.exec(item);
	if (attr) store[attr[1]] = context(item);
});

export default store;
