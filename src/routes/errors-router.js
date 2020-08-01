import load from '../helper/load';

export default [
	{
		path: '/403',
		exact: true,
		title: '这是403页面',
		breadcrumbName: '403面包屑',
		component: load(() => import('../pages/403')),
	},
	{
		path: '/500',
		exact: true,
		title: '这是500页面',
		breadcrumbName: '500面包屑',
		component: load(() => import('../pages/500')),
	},
	// 其实这个404配置和下面404配置是冲突的，这个会跳转404路由
	// 二者留一即可，存在也不会有什么特殊影响
	// {
	// 	path: '/404',
	// 	exact: true,
	// 	title: 'OOPS！访问出错了',
	// 	breadcrumbName: 'OOPS！访问出错了',
	// 	component: load(() => import('../pages/404')),
	// },
	// 此配置对象假如存在必须在最后一个
	// 这个不会跳转404路由，而是当前地址显示404页面，体验更好
	{
		path: '/*',
		exact: true,
		title: 'OOPS！访问出错了',
		breadcrumbName: '错误页面',
		component: load(() => import('../pages/404')),
	},
];
