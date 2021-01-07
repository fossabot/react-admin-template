import React, { useState } from 'react';
import { Card, Form, Input, Checkbox, Button } from 'antd';
import classnames from 'classnames';

import s from './index.module.less';
import normal from '../../img/normal.png';
import greeting from '../../img/greeting.png';
import blindfold from '../../img/blindfold.png';

export default function LoginCard(): React.ReactElement {
	const [panda, setPanda] = useState('normal');

	return (
		<Card className={s.card}>
			<img className={classnames(s.panda, { [s.show]: panda === 'normal' })} src={normal} alt="" />
			<img
				className={classnames(s.panda, { [s.show]: panda === 'greeting' })}
				src={greeting}
				alt=""
			/>
			<img
				className={classnames(s.panda, { [s.show]: panda === 'blindfold' })}
				src={blindfold}
				alt=""
			/>
			<Form name="login">
				<Form.Item
					label="账户"
					name="username"
					rules={[{ required: true, message: '请输入用户名/邮箱！' }]}
				>
					<Input
						size="large"
						autoComplete="off"
						placeholder="请输入用户名/邮箱"
						onFocus={(): void => {
							setPanda('greeting');
						}}
						onBlur={(): void => {
							setPanda('normal');
						}}
					/>
				</Form.Item>
				<Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
					<Input.Password
						size="large"
						onFocus={(): void => {
							setPanda('blindfold');
						}}
						onBlur={(): void => {
							setPanda('normal');
						}}
					/>
				</Form.Item>

				<Form.Item className={s.remember} name="remember" valuePropName="checked">
					<Checkbox>记住密码</Checkbox>
				</Form.Item>

				<Form.Item noStyle>
					<Button block size="large" type="primary" htmlType="submit">
						登录
					</Button>
				</Form.Item>
			</Form>
		</Card>
	);
}
