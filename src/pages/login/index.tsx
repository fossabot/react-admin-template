import React from 'react';

import LoginCard from './components/login-card';
import s from './index.module.less';

export default function Login(): React.ReactElement {
	return (
		<div className={s.login}>
			<LoginCard />
		</div>
	);
}
