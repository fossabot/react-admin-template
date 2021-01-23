/**
 * 本来打算用此组件处理一些全局逻辑
 * 经实践发现大多为一些边缘逻辑，为减少一层嵌套因此挪到`src/pages/reactive`路由页面处理了
 */
import React from 'react';

interface IProps {
	children: React.ReactElement;
}

const Container: React.FC<IProps> = (props) => {
	return props.children;
};

export default Container;
