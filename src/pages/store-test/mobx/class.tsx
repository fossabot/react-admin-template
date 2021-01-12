import React from 'react';
import { Card, Button } from 'antd';
import { inject, observer } from 'mobx-react';

export interface IProps {
	system: {
		systemName: string;
		onSetSystemName: (name: string) => void;
	}
}

let count = 0;

@inject('system')
@observer
export default class MobxTestC extends React.Component<IProps> {
	constructor(props: Readonly<IProps>) {
		super(props);
		this.state = {};
	}

	componentDidMount(): void {
		console.log(this.props);
	}

	onHandleClick = ():void => {
		this.props.system.onSetSystemName(`更改了系统名称${count += 1}`);
	}

	render(): React.ReactElement {
		return (
			<Card>
				<p>我是mobx类组件</p>
				<h1>{this.props.system.systemName}</h1>
				<Button
					type="primary"
					onClick={this.onHandleClick}
				>
					点击
				</Button>
			</Card>
		);
	}
}
