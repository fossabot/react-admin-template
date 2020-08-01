import load from '../helper/load';

/**
 * @description: 样板
 * @author: jkSun
 * @date: 2020/5/13 14:17
 */

export default [
	{
		path: '/sample',
		exact: true,
		title: '这是模板页面',
		breadcrumbName: '我是简易模板页面',
		component: load(() => import('../pages/sample')),
	},
];
