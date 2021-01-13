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
				<div>我是redux类组件</div>
				<div>hooks很香，使用了@reduxjs/toolkit类组件不再支持redux状态管理</div>
				<h1>如果使用redux又想使用类组件，请自行改造</h1>
				<Button type="primary">点击</Button>
			</Card>
		);
	}
}
