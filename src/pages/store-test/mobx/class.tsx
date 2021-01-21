import React from 'react';
import { Card, Button } from 'antd';
import { inject, observer } from 'mobx-react';
import PermissionTest from './components/perssion-test';

export interface IProps {
	system: {
		count: number;
		systemName: string;
		onSetCount: (num: number) => void;
	};
	global: {
		permissions: { [key: string]: boolean };
		changePermissions: (permissions: { [key: string]: boolean }) => void;
	};
}

@inject('system', 'global')
@observer
export default class MobxTestC extends React.Component<IProps> {
	constructor(props: Readonly<IProps>) {
		super(props);
		this.state = {};
	}

	onHandleClick = () => {
		this.props.system.onSetCount(1);
		this.props.global.changePermissions({
			张三: !this.props.global.permissions['张三'],
		});
	};

	render(): React.ReactElement {
		const {
			system: { systemName, count },
			global: { permissions },
		} = this.props;

		return (
			<Card>
				<p>我是mobx类组件</p>
				<h1>{`${systemName} - ${count}`}</h1>
				<Button type="primary" onClick={this.onHandleClick}>
					点击
				</Button>

				<div style={{ marginTop: 10 }}>
					当前拥有的权限：
					{JSON.stringify(permissions)}
				</div>

				<PermissionTest />
			</Card>
		);
	}
}
