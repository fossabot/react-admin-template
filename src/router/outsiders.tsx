import React from 'react';
import { LoginOutlined } from '@ant-design/icons';

import load from '../utils/load';
import { IRouterConfig } from '../utils/render-routes';

/**
 * 无公共功能组件路由列表
 */
const outsiders: IRouterConfig[] = [
	{
		path: '/login',
		component: load(() => import('../pages/login')),
		meta: { title: '登录', icon: <LoginOutlined />, showInTabs: false },
	},
];

export default outsiders;
