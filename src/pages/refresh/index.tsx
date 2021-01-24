/**
 * 应用内刷新中转页面
 * @description 思路: 原路由跳转至本中转页面再跳转回去以完整刷新
 */
import React from 'react';
import { useLocation, useHistory } from 'react-router';
import useEnhancedEffect from '@/utils/use-enhanced-effect';

interface IState {
	pathname: string;
	search?: string;
	hash?: string;
	originState: any;
}

const Refresh: React.FC = () => {
	const location = useLocation<IState>();
	const history = useHistory();
	const state = location.state;

	useEnhancedEffect(() => {
		if (!state) {
			history.replace('/');
		} else {
			history.replace({
				pathname: state.pathname,
				search: state.search,
				hash: state.hash,
				state: state.originState,
			});
		}
	}, []);

	return null;
};

export default Refresh;
