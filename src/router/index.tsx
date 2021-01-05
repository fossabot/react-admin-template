import React from 'react';
import { DesktopOutlined, DashboardOutlined, VerifiedOutlined, FieldNumberOutlined } from '@ant-design/icons';

import load from '../utils/load';
import { IRouterConfig } from '../utils/render-routes';

/**
 * key 			   				{String}   			key
 * path 			   			{String}   			路由地址
 * exact 			   			{Boolean}  			精确匹配，如果存在子路由，父级路由必须。默认: false
 * strict 			   		{Boolean}  			严格匹配，是否考虑尾部斜杠。默认: false
 * sensitive 			   	{Boolean}  			是否区分大小写匹配。默认: false
 * redirect 			   	{String}   			重定向路由地址。@todo
 * render 			   		{Function} 			路由地址
 * component 			   	{ReactElement}	路由地址
 * 其他扩展字段
 * meta 			   			{Object}   			元数据
 * meta?.title   			{[]} 						标题
 * meta?.icon    			{String}   			icon
 * meta?.pin     			{Boolean}  			是否固定在标签栏。默认: false
 * meta?.cache   			{Boolean}  			是否被缓存，类似Vue。@todo
 * meta?.hidden  			{Boolean}  			是否被从导航栏隐藏，如果为true，同时不会被添加到tabs栏，父级隐藏所有子级也会隐藏。默认: false
 * meta?.showInTabs		{Boolean}  			是否被添加到tabs栏，优先级高于hidden。默认: true
 * meta?.some					{Boolean}				鉴权逻辑，authorities满足其一即为有权限。默认为false。
 * meta?.authorities	{Boolean}				权限列表。
 * meta?.fallback			{Boolean}				无权限回退页面。默认"/403"
 * @type {*[]}
 */
const routes: IRouterConfig[] = [
	{
		path: '/dashboard',
		exact: true,
		component: load(() => import('../pages/dashboard')),
		meta: { title: '工作台', icon: <DashboardOutlined />, authorities: ['权限test3', '权限test4'] },
	},
	{
		path: '/home',
		exact: true,
		component: load(() => import('../pages/home')),
		meta: { title: '首页', icon: <DesktopOutlined />, authorities: [], some: true },
		routes: [
			{
				path: '/dashboard1',
				exact: true,
				component: load(() => import('../pages/dashboard')),
				meta: { title: '工作台', icon: <DashboardOutlined />, authorities: ['权限test3', '权限test4'] },
			},
			{
				path: '/home1',
				exact: true,
				component: load(() => import('../pages/home')),
				meta: { title: '首页', icon: <DesktopOutlined />, authorities: [], some: true },
			},
		],
	},
	{
		path: '/errors',
		component: null,
		meta: { title: 'errors', icon: <VerifiedOutlined /> },
		routes: [
			{
				path: '/403',
				component: load(() => import('../pages/errors/403')),
				meta: { title: '403', icon: <VerifiedOutlined />, hidden: true },
			},
			{
				path: '/404',
				component: load(() => import('../pages/errors/404')),
				meta: { title: '404', icon: <FieldNumberOutlined /> },
			},
		],
	},
	{
		path: '/*',
		component: load(() => import('../pages/errors/404')),
		meta: { title: '/*', icon: <FieldNumberOutlined />, authorities: ['权限test3', '权限test4'], hidden: true },
	},
];

export default routes;
