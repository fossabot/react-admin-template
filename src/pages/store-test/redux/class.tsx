import React from 'react';
import { Card, Button } from 'antd';
import { connect } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';

export interface IProps {
	system: {
		count: number;
		systemName: string;
	};
	incrementByAmount: (num: number) => void;
}

class MobxTestC extends React.Component<IProps> {
	constructor(props: IProps) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		console.log(this.props);
	}

	onHandleClick = () => {
		this.props.incrementByAmount(1);
	};

	render() {
		const {
			system: { systemName, count },
		} = this.props;
		return (
			<Card>
				<p>我是redux类组件</p>
				<h1>{`${systemName} - ${count}`}</h1>
				<Button type="primary" onClick={this.onHandleClick}>
					点击
				</Button>
			</Card>
		);
	}
}

function mapStateToProps(state: RootState) {
	return {
		system: state.system,
	};
}

function mapDispatchToProps(dispatch: AppDispatch) {
	return {
		incrementByAmount: (num: number) =>
			dispatch({
				type: 'system/incrementByAmount',
				payload: num,
			}),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MobxTestC);
