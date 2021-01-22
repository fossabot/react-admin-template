import React from 'react';
import { Card, Button } from 'antd';
import { connect } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import PermissionTest from './components/perssion-test';

export interface IProps {
	system: {
		systemName: string;
	};
	global: {
		permissions: string[];
	};
	setPermissions: (permissions: string[]) => void;
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
		const {
			global: { permissions },
		} = this.props;

		let list;
		if (permissions.includes('李四')) {
			list = permissions.filter((p) => p !== '李四');
		} else {
			list = [...permissions, '李四'];
		}

		this.props.setPermissions(list);
	};

	render() {
		const {
			system: { systemName },
			global: { permissions },
		} = this.props;
		return (
			<Card>
				<p>我是redux类组件</p>
				<h1>{systemName}</h1>
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
		setPermissions: (permissions: string[]) => {
			console.log(permissions, '====');
			dispatch({
				type: 'global/setPermissions',
				payload: permissions,
			});
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxTestC);
