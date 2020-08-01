/**
 * 路由配置集中再此，前面斜杠必须，作为规则配置文件，代码中不会容错
 * config.title 显示在浏览器选项卡中的标题
 * config.breadcrumbName 面包屑导航名称?.config.title
 * config.authority 路由所需权限列表
 * config.some 权限满足条件 every二选一，优先级高于every
 * config.every 权限满足条件 some二选一，优先级低于some
 */

import load from '../helper/load';
import sampleRouter from './sample-router';
import errorsRouter from './errors-router';

export default [
	{
		path: '/',
		redirect: '/sample',
		breadcrumbName: '首页',
		component: load(() => import('../layout/base-layout')),
		routes: [
			{
				path: '/login',
				exact: true,
				title: '用户登录',
				breadcrumbName: '用户登录',
				component: load(() => import('../pages/login')),
			},
			...sampleRouter,

			// 如果配置【/*】，此项必须始终在最后
			...errorsRouter,
		],
	},
];
