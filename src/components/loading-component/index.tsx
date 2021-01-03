import React from 'react';
import { Spin } from 'antd';

export default function LoadingComponent(): React.ReactElement {
	return <Spin size="large" tip="loading..." />;
}
