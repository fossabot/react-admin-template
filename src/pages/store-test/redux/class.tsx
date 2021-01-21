import React from 'react';
import { Card, Button } from 'antd';
import { connect } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import PermissionTest from '../components/perssion-test';

export interface IProps {
	system: {
		count: number;
		systemName: string;
	};
	global: {
		permissions: { [key:string]: boolean };
	};
	incrementByAmount: (num: number) => void;
	changePermissions: (permissions: { [key: string]: boolean }) => void;
}

class ReduxTestC extends React.Component<IProps> {
	constructor(props: IProps) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		console.log(this.props);
	}

	onHandleClick = () => {
		this.props.incrementByAmount(1);
		this.props.changePermissions({
			李四: !this.props.global.permissions['李四'],
		});
	};

	render() {
		const {
			system: { systemName, count },
			global: { permissions },
		} = this.props;
		return (
			<Card>
				<p>我是redux类组件</p>
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

function mapStateToProps(state: RootState) {
	return {
		system: state.system,
		global: state.global,
	};
}

function mapDispatchToProps(dispatch: AppDispatch) {
	return {
		incrementByAmount: (num: number) => {
			dispatch({
				type: 'system/incrementByAmount',
				payload: num,
			});
		},
		changePermissions: (permissions: { [key: string]: boolean }) => {
			dispatch({
				type: 'global/changePermissions',
				payload: permissions,
			});
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxTestC);
