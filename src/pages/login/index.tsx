import React from 'react';

import LoginCard from './components/login-card';
import s from './index.module.less';

const Login: React.FC = () => {
	return (
		<div className={s.login}>
			<LoginCard />
		</div>
	);
};

export default Login;
