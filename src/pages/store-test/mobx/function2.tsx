import React from 'react';
import { Card, Button } from 'antd';
import { MobXProviderContext, Observer } from 'mobx-react';

export interface IProps {
	system: {
		count: number;
		systemName: string;
		onSetCount: (num: number) => void;
	};
}

const MobxTestF: React.FC = () => {
	const mpc = React.useContext(MobXProviderContext) as IProps;

	function onHandleClick(): void {
		mpc.system.onSetCount(1);
	}

	return (
		<Observer>
			{() => {
				const {
					system: { systemName, count },
				} = mpc;

				return (
					<Card>
						<p>我是mobx函数组件2</p>
						<h1>{`${systemName} - ${count}`}</h1>
						<Button type="primary" onClick={onHandleClick}>
							点击
						</Button>
					</Card>
				);
			}}
		</Observer>
	);
};

export default MobxTestF;
