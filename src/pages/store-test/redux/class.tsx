import React from 'react';
import { Card, Button } from 'antd';

export default class MobxTestC extends React.Component {
	constructor(props: Readonly<any>) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		console.log(this.props);
	}

	render() {
		return (
			<Card>
				<h1>我是redux类组件</h1>
				<Button type="primary">点击</Button>
			</Card>
		);
	}
}
