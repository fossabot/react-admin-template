import React from 'react';
import { Card, Button } from 'antd';
import { inject, observer } from 'mobx-react';

export interface IProps {
	system: {
		count: number;
		systemName: string;
		onSetCount: (num: number) => void;
	}
}

const MobxTestF: React.FC<IProps> = (props: IProps) => {
	function onHandleClick(): void {
		props.system.onSetCount(1);
	}

	const { system: { systemName, count } } = props;

	return (
		<Card>
			<p>我是mobx函数组件1</p>
			<h1>{`${systemName} - ${count}`}</h1>
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
