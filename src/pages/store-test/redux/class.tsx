import React from 'react';
import { Card, Button } from 'antd';

export default class MobxTestC extends React.Component {
	// eslint-disable-next-line @typescript-eslint/ban-types
	constructor(props: {} | Readonly<{}>) {
		super(props);
		this.state = {};
	}

	componentDidMount(): void {
		console.log(this.props);
	}

	render(): React.ReactElement {
		return (
			<Card>
				<h1>我是redux类组件</h1>
				<Button type="primary">点击</Button>
			</Card>
		);
	}
}
