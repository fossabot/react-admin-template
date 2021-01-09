import React from 'react';
import { Spin } from 'antd';

const LoadingComponent: React.FC = () => {
	return <Spin size="large" tip="loading..." />;
};

export default LoadingComponent;
