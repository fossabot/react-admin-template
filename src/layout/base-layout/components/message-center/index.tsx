import React, { useState } from 'react';
import { Dropdown, Badge, Menu } from 'antd';
import { BellOutlined, ClearOutlined } from '@ant-design/icons';
import s from './index.module.less';

const MessageCenter: React.FC = () => {
	const [visible, setVisible] = useState(false);
	const overlay = (
		<Menu className={s.messageCenterMenu}>
			<section className={s.header}>
				<div className={s.title}>通知中心</div>
				<div>
					未读信息:
					<span className={s.count}>100</span>
					条
				</div>
				<ClearOutlined className={s.clear} />
			</section>
			<Menu.Item className={s.messageCenterMenuItem}>
				<div className={s.messageTitle}>施罗德：对价值股大面积忽视意味着机会多多 商业模式结构缺陷实属过虑</div>
				<div
					className={s.messageDescribe}
				>
					施罗德于最新研报中表示，价值投资在过去十年的表现不佳导致了人们对它的怀疑。但研报认为当下有很多，基本面有吸引力但近些年来被忽视的公司将会受到更多的青睐。
				</div>
			</Menu.Item>
			<Menu.Item className={s.messageCenterMenuItem}>权限管理</Menu.Item>
			<Menu.Item className={s.messageCenterMenuItem}>系统设置</Menu.Item>
			<Menu.Item className={s.messageCenterMenuItem}>安全退出</Menu.Item>
		</Menu>
	);
	return (
		<Dropdown
			arrow
			visible={visible}
			trigger={['click']}
			overlay={overlay}
			onVisibleChange={setVisible}
		>
			<div className={s.messageCenter}>
				<Badge count={100}>
					<BellOutlined className={s.bell} />
				</Badge>
			</div>
		</Dropdown>
	);
};

export default MessageCenter;
