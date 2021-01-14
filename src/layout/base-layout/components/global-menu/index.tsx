import React from 'react';
import { Menu } from 'antd';
import { MenuMode } from 'antd/lib/menu';
import { useLocation, useHistory } from 'react-router';

import { IRouterConfig } from '@/utils/render-routes';
import routes from '@/router';
import { SelectInfo } from '@/interface/menu';
// import s from './index.module.less';

export interface IProps {
	mode?: MenuMode
}

const { Item: MenuItem, SubMenu } = Menu;

const GlobalMenu: React.FC<IProps> = (props: IProps) => {
	const location = useLocation();
	const history = useHistory();

	function onHandleMenuSelect(item: SelectInfo): void {
		if (location.pathname !== item.key) {
			console.log(item);
			history.push(`${item.key}`);
		}
	}

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
					<SubMenu key={route.path} title={route.meta?.title} icon={route.meta?.icon}>
						{renderMenuItem(subRoutes)}
					</SubMenu>
				);
			}

			return (
				<MenuItem key={route.path} icon={route.meta?.icon}>
					{route.meta?.title}
				</MenuItem>
			);
		});
	}

	return (
		<Menu
			theme="dark"
			mode={props.mode || 'inline'}
			inlineIndent={12}
			defaultOpenKeys={[]}
			defaultSelectedKeys={[location.pathname]}
			onClick={onHandleMenuSelect}
		>
			{renderMenuItem(routes.filter((item) => item && !item.meta?.hidden))}
		</Menu>
	);
};

export default GlobalMenu;
