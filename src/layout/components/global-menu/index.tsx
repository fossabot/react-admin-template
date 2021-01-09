import React from 'react';
import { Menu } from 'antd';

import { IRouterConfig } from '../../../utils/render-routes';
import routes from '../../../router';

import s from './index.module.less';

const { Item: MenuItem, SubMenu } = Menu;

const GlobalMenu: React.FC = () => {
	function renderMenuItem(list?: IRouterConfig[]): null | (null | React.ReactElement)[] {
		if (!Array.isArray(list) || !list.length) {
			return null;
		}
		return list.map((route) => {
			const subRoutes = route.routes?.filter((item) => item && !item.meta?.hidden);
			const hasSubMenu = subRoutes?.length;

			// route.routes为空会认为是有效的菜单，在判断
			// 此处值判断route.routes非空且全部hidden返回null
			if (route.routes?.length && !hasSubMenu) {
				return null;
			}

			if (hasSubMenu) {
				return (
					<SubMenu key={route.key || route.path} title={route.meta?.title} icon={route.meta?.icon}>
						{renderMenuItem(subRoutes)}
					</SubMenu>
				);
			}

			return (
				<MenuItem key={route.key || route.path} icon={route.meta?.icon}>
					{route.meta?.title}
				</MenuItem>
			);
		});
	}

	return (
		<Menu className={s.globalMenu} theme="dark" mode="inline" defaultSelectedKeys={['1']}>
			{renderMenuItem(routes.filter((item) => item && !item.meta?.hidden))}
		</Menu>
	);
};

export default GlobalMenu;
