import React from 'react';
import { Card, Button } from 'antd';
import { inject, observer } from 'mobx-react';
import PermissionTest from './components/perssion-test';

export interface IProps {
	system: {
		systemName: string;
	};
	global: {
		permissions: { [key: string]: boolean };
		changePermissions: (permissions: { [key: string]: boolean }) => void;
	};
}

const MobxTestF: React.FC<IProps> = (props: IProps) => {
	function onHandleClick(): void {
		props.global.changePermissions({
			张三: !props.global.permissions['张三'],
		});
	}

	const {
		system: { systemName },
		global: { permissions },
	} = props;

	return (
		<Card>
			<p>我是mobx函数组件1</p>
			<h1>{systemName}</h1>
			<Button type="primary" onClick={onHandleClick}>
				点击
			</Button>

			<div style={{ marginTop: 10 }}>
				当前拥有的权限：
				{JSON.stringify(permissions)}
			</div>

			<PermissionTest />
		</Card>
	);
};

export default inject('system', 'global')(observer(MobxTestF));
