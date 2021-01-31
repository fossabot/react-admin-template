import React from 'react';
import { Card } from 'antd';
import qs from 'qs';

const Dashboard: React.FC = () => {
	console.log(qs.stringify({ a: 1, b: 2, c: { g: 1 } }));
	return <Card>Dashboard</Card>;
};

export default Dashboard;
