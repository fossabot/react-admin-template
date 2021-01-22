import React from 'react';
import { Card, Button } from 'antd';
import { useStore, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
// import { changePermissions } from '@/redux/store/global';
import PermissionTest from './components/perssion-test';

const MobxTestF: React.FC = () => {
	const store = useStore();
	// const dispatch = useDispatch();
	const selector = useSelector((data: RootState) => {
		return {
			system: data.system,
			global: data.global,
		};
	});

	// 两种方式提交数据变更
	function onHandleClick() {
		const { permissions } = selector.global;

		let list;
		if (permissions.includes('李四')) {
			list = permissions.filter((p) => p !== '李四');
		} else {
			list = [...permissions, '李四'];
		}

		store.dispatch({
			type: 'global/setPermissions',
			payload: list,
		});

		// dispatch(setPermissions(list.filter(Boolean)));
	}

	return (
		<Card>
			<p>我是redux函数组件</p>
			<h1>{selector.system.systemName}</h1>
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
