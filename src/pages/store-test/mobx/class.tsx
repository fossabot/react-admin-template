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
		this.props.system.onSetCount(1);
	}

	render(): React.ReactElement {
		const { system: { systemName, count } } = this.props;

		return (
			<Card>
				<p>我是mobx类组件</p>
				<h1>{`${systemName} - ${count}`}</h1>
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
