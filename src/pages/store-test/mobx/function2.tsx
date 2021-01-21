import React from 'react';
import { Card, Button } from 'antd';
import { MobXProviderContext, Observer } from 'mobx-react';
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

const MobxTestF: React.FC = () => {
	const mpc = React.useContext(MobXProviderContext) as IProps;

	function onHandleClick(): void {
		mpc.global.changePermissions({
			李四: !mpc.global.permissions['李四'],
		});
	}

	return (
		<Observer>
			{() => {
				const {
					system: { systemName },
					global: { permissions },
				} = mpc;

				return (
					<Card>
						<p>我是mobx函数组件2</p>
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
			}}
		</Observer>
	);
};

export default MobxTestF;
