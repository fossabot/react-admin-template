import React from 'react';
import { GlobalOutlined, MergeCellsOutlined, ConsoleSqlOutlined, ClusterOutlined } from '@ant-design/icons';

import load from '../utils/load';
import { IRouterConfig } from '../utils/render-routes';

/**
 * 无公共功能组件路由列表
 */
const outsiders: IRouterConfig[] = [
	{
		path: '/store-test',
		exact: true,
		component: null,
		redirect: '/store-test/mobx',
		meta: { title: '状态管理器演示', icon: <GlobalOutlined /> },
		routes: [
			{
				path: '/store-test/mobx',
				exact: true,
				component: null,
				redirect: '/store-test/mobx/function-component',
				meta: { title: 'mobx', icon: <MergeCellsOutlined /> },
				routes: [
					{
						path: '/store-test/mobx/function-component1',
						component: load(() => import('../pages/store-test/mobx/function1')),
						meta: { title: '函数组件1', icon: <ConsoleSqlOutlined />, showInTabs: false },
					},
					{
						path: '/store-test/mobx/function-component2',
						component: load(() => import('../pages/store-test/mobx/function2')),
						meta: { title: '函数组件2', icon: <ConsoleSqlOutlined />, showInTabs: false },
					},
					{
						path: '/store-test/mobx/class-component',
						component: load(() => import('../pages/store-test/mobx/class')),
						meta: { title: '类组件', icon: <ClusterOutlined />, showInTabs: false },
					},
				],
			},
			{
				path: '/store-test/redux',
				exact: true,
				component: null,
				redirect: '/store-test/redux/function-component',
				meta: { title: 'redux', icon: <MergeCellsOutlined /> },
				routes: [
					{
						path: '/store-test/redux/function-component',
						component: load(() => import('../pages/store-test/redux/function')),
						meta: { title: '函数组件', icon: <ConsoleSqlOutlined />, showInTabs: false },
					},
					{
						path: '/store-test/redux/class-component',
						component: load(() => import('../pages/store-test/redux/class')),
						meta: { title: '类组件', icon: <ClusterOutlined />, showInTabs: false },
					},
				],
			},
		],
	},
];

export default outsiders;
