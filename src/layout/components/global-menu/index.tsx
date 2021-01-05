import React from 'react';
import { Menu } from 'antd';
import {
	AppstoreOutlined,
	ContainerOutlined,
	DesktopOutlined,
	MailOutlined,
	PieChartOutlined,
} from '@ant-design/icons';
import routes from '../../../router';

import s from './index.module.less';

const { Item: MenuItem, SubMenu } = Menu;

export default function GlobalMenu(): React.ReactElement {
	setTimeout(() => {
		console.log(routes, '======');
	}, 1000)
	return (
		<Menu className={s.globalMenu} theme="dark" mode="inline" defaultSelectedKeys={['1']}>
			{routes.map((route) => {
				return (
					<MenuItem key={route.key || route.path} icon={route.meta?.icon}>
						{route.meta?.title}
					</MenuItem>
				)
			})}

			<MenuItem key="2" icon={<DesktopOutlined />}>
				Option 2
			</MenuItem>
			<MenuItem key="3" icon={<ContainerOutlined />}>
				Option 3
			</MenuItem>
			<SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
				<MenuItem key="5">Option 5</MenuItem>
				<MenuItem key="6">Option 6</MenuItem>
				<MenuItem key="7">Option 7</MenuItem>
				<MenuItem key="8">Option 8</MenuItem>
			</SubMenu>
			<SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
				<MenuItem key="9">Option 9</MenuItem>
				<MenuItem key="10">Option 10</MenuItem>
				<SubMenu key="sub3" title="Submenu">
					<MenuItem key="11">Option 11</MenuItem>
					<MenuItem key="12">Option 12</MenuItem>
				</SubMenu>
			</SubMenu>
			<MenuItem key="13" icon={<PieChartOutlined />}>
				Option 1
			</MenuItem>
			<MenuItem key="14" icon={<DesktopOutlined />}>
				Option 2
			</MenuItem>
			<MenuItem key="15" icon={<ContainerOutlined />}>
				Option 3
			</MenuItem>
			<SubMenu key="sub4" icon={<MailOutlined />} title="Navigation One">
				<MenuItem key="16">Option 5</MenuItem>
				<MenuItem key="17">Option 6</MenuItem>
				<MenuItem key="18">Option 7</MenuItem>
				<MenuItem key="19">Option 8</MenuItem>
			</SubMenu>
			<SubMenu key="sub5" icon={<AppstoreOutlined />} title="Navigation Two">
				<MenuItem key="20">Option 9</MenuItem>
				<MenuItem key="21">Option 10</MenuItem>
				<SubMenu key="sub6" title="Submenu">
					<MenuItem key="22">Option 11</MenuItem>
					<MenuItem key="23">Option 12</MenuItem>
				</SubMenu>
			</SubMenu>
		</Menu>
	);
}
