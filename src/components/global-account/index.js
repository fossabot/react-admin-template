/**
 * 个人中心
 */
import React from 'react';
import { Menu, Dropdown } from 'antd';
import {
	GithubOutlined,
	UserOutlined,
	SettingOutlined,
	DashboardOutlined,
	SyncOutlined,
	QuestionCircleOutlined,
	LoginOutlined,
} from '@ant-design/icons';

import s from './index.module.less';

const MenuItem = Menu.Item;

function GlobalAccount() {
	const menu = (
		<Menu onClick={console.log}>
			<MenuItem>
				<UserOutlined className={s.icon} />
				<span>个人中心</span>
			</MenuItem>
			<MenuItem>
				<SettingOutlined className={s.icon} />
				<span>首页设置</span>
			</MenuItem>
			<MenuItem>
				<DashboardOutlined className={s.icon} />
				<span>工作台</span>
			</MenuItem>
			<MenuItem>
				<SyncOutlined className={s.icon} />
				<span>刷新缓存</span>
			</MenuItem>
			<MenuItem>
				<QuestionCircleOutlined className={s.icon} />
				<span>关于系统</span>
			</MenuItem>
			<MenuItem>
				<LoginOutlined className={s.icon} />
				<span>退出系统</span>
			</MenuItem>
		</Menu>
	);
	return (
		<>
			<Dropdown
				overlay={menu}
				// trigger="click"
				placement="bottomRight"
				overlayClassName={s['dropdown-container']}
			>
				<div className={s['header-account']}>
					<GithubOutlined className={s.avatar} />
					<span className={s.name}>vanilla</span>
				</div>
			</Dropdown>
		</>
	);
}

export default GlobalAccount;
