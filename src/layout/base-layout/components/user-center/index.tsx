import React from 'react';
import { Dropdown, Avatar, Menu } from 'antd';
import { UserOutlined, VerifiedOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import s from './index.module.less';

const UserCenter: React.FC = () => {
	const overlay = (
		<Menu className={s.userCenterMenu}>
			<div className={s.header}>
				<div className={s.name}>vanilla</div>
				<div className={s.email}>uninge.sun@gmail.com</div>
			</div>
			<Menu.Item
				className={s.userCenterMenuItem}
				icon={<UserOutlined style={{ fontSize: 16 }} />}
			>
				个人中心
			</Menu.Item>
			<Menu.Item
				className={s.userCenterMenuItem}
				icon={<VerifiedOutlined style={{ fontSize: 16 }} />}
			>
				权限管理
			</Menu.Item>
			<Menu.Item
				className={s.userCenterMenuItem}
				icon={<SettingOutlined style={{ fontSize: 16 }} />}
			>
				系统设置
			</Menu.Item>
			<Menu.Item
				className={s.userCenterMenuItem}
				icon={<LogoutOutlined style={{ fontSize: 16 }} />}
			>
				安全退出
			</Menu.Item>
		</Menu>
	);

	return (
		<Dropdown
			arrow
			trigger={['click']}
			overlay={overlay}
		>
			<div className={s.userCenter}>
				<Avatar
					className={s.avatar}
					size="large"
					icon={<UserOutlined />}
					src="https://avatars0.githubusercontent.com/u/22541178"
				/>
			</div>
		</Dropdown>
	);
};

export default UserCenter;
