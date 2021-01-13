import React from 'react';
import { Card, Button } from 'antd';
import { useStore, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { increment } from '../../../redux/store/system';

const MobxTestF: React.FC = () => {
	const store = useStore();
	const dispatch = useDispatch();
	const selector = useSelector(((data: RootState) => {
		return data.system;
	}));

	// 两种方式提交数据变更
	function onHandleClick() {
		dispatch(increment());

		setTimeout(() => {
			store.dispatch({
				type: 'system/incrementByAmount',
				payload: 666,
			});
		}, 3000);
	}

	return (
		<Card>
			<h1>我是redux函数组件</h1>
			<h1>{`${selector.systemName} - ${selector.count}`}</h1>
			<Button
				type="primary"
				onClick={onHandleClick}
			>
				点击
			</Button>
		</Card>
	);
};

export default MobxTestF;
