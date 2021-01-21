import React from 'react';
import { Card, Button } from 'antd';
import { useStore, useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { increment } from '@/redux/store/system';
import PermissionTest from './components/perssion-test';

const MobxTestF: React.FC = () => {
	const store = useStore();
	const dispatch = useDispatch();
	const selector = useSelector((data: RootState) => {
		return {
			system: data.system,
			global: data.global,
		};
	});

	// 两种方式提交数据变更
	function onHandleClick() {
		dispatch(increment());
		store.dispatch({
			type: 'global/changePermissions',
			payload: {
				张三: !selector.global.permissions['张三'],
			},
		});

		setTimeout(() => {
			store.dispatch({
				type: 'system/incrementByAmount',
				payload: 1,
			});
		}, 1000);
	}

	return (
		<Card>
			<p>我是redux函数组件</p>
			<h1>{`${selector.system.systemName} - ${selector.system.count}`}</h1>
			<Button type="primary" onClick={onHandleClick}>
				点击
			</Button>

			<div style={{ marginTop: 10 }}>
				当前拥有的权限：
				{JSON.stringify(selector.global.permissions)}
			</div>

			<PermissionTest />
		</Card>
	);
};

export default MobxTestF;
