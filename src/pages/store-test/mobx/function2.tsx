import React from 'react';
import { Card, Button } from 'antd';
import { MobXProviderContext, Observer } from 'mobx-react';

export interface IProps {
	system: {
		systemName: string;
		onSetSystemName: (name: string) => void;
	}
}

let count = 0;
const MobxTestF: React.FC = () => {
	const ob = React.useContext(MobXProviderContext) as IProps;

	function onHandleClick(): void {
		ob.system.onSetSystemName(`更改了系统名称${count += 1}`);
	}

	return (
		<Observer>
			{() => (
				<Card>
					<p>我是mobx函数组件2</p>
					<h1>{ob.system.systemName}</h1>
					<Button
						type="primary"
						onClick={onHandleClick}
					>
						点击
					</Button>
				</Card>
			)}
		</Observer>
	);
};

export default MobxTestF;
