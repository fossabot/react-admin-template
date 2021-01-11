import React from 'react';
import { Card, Button } from 'antd';
import { inject, observer } from 'mobx-react';

export interface IProps {
	system: {
		systemName: string;
		// eslint-disable-next-line no-unused-vars
		onSetSystemName: (name: string) => void;
	}
}

let count = 0;
const MobxTestF: React.FC<IProps> = (props: IProps) => {
	function onHandleClick(): void {
		props.system.onSetSystemName(`更改了系统名称${count += 1}`);
	}

	return (
		<Card>
			<p>我是mobx函数组件2</p>
			<h1>{props.system.systemName}</h1>
			<Button
				type="primary"
				onClick={onHandleClick}
			>
				点击
			</Button>
		</Card>
	);
};

export default inject('system')(observer(MobxTestF));
