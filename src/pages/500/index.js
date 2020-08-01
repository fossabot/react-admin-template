import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

export default function NotFond() {
	return (
		<Result
			status="500"
			title="500"
			subTitle="Sorry, something went wrong."
			extra={
				<Button type="primary">
					<Link to="/">返回首页</Link>
				</Button>
			}
		/>
	);
}
