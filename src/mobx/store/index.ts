/**
 * mobx store入口
 * store文件使用 module.exports 导出，下面代码使用 context(key) 使用
 * store文件使用 export default 导出，但是下面代码需要处理取 context(key).default 属性
 * 注：目前约定统一使用 module.exports 导出，根据喜好自行更改
 */

const store: { [key: string]: any } = {};
store.pages = {};

const context = require.context('.', true, /\.ts$/);
const keys = context.keys().filter((item: string) => item !== './index.ts');

keys.forEach((key: string) => {
	const pathKeys = key.replace(/\.\//, '').replace(/\.ts$/g, '').split('/');

	if (pathKeys.length === 1) {
		if (pathKeys[0] === 'pages') {
			throw new Error('pages已被文件夹占用，请更换文件名');
		}
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		store[pathKeys[0]] = context(key);
	}

	// 页面级store全部挂载在pages对象下
	// 不过不建议页面级store写在此文件夹下，建议写在具体页面所在目录
	if (pathKeys.length === 2) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
		store.pages[pathKeys[1]] = context(key);
	}

	if (pathKeys.length > 2) {
		throw new Error('pages文件夹下不支持创建文件夹，如必须创建请自行修改此文件相关处理逻辑');
	}
});

export default store;
