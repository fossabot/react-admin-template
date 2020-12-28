import React, { Component } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import JsCookie from 'js-cookie';
import { getQueryString } from '../../utils/functions';
import { onLogin } from '../../apis';

import s from './index.module.less';
import Logo from '../../assets/icon/icon_logo.png';

const FormItem = Form.Item;

@inject('global')
@observer
export default class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
		};
	}

	onFinish = ({ UserName, Password }) => {
		this.setState({
			isLoading: true,
		});
		onLogin({
			UserName,
			Password,
		})
			.then(({ Message: token, UID, RealName, Photo }) => {
				const cookie = {
					userName: UserName,
					userID: UID,
					realName: RealName,
					photo: Photo,
				};

				// cookie携带的鉴权信息并不包括以下字段，只因老系统用到
				JsCookie.set('userName', UserName);
				JsCookie.set('token', token);
				JsCookie.set(UserName, JSON.stringify(cookie));
				JsCookie.set('currentUser', JSON.stringify(cookie));

				message.success('登录成功');

				this.props.history.replace(getQueryString('redirect') || '/');
			})
			.catch((err) => {
				message.error(err.message || '登录失败，请稍后再试');
				this.setState({
					isLoading: false,
				});
			});
	};

	render() {
		const { isLoading } = this.state;

		return (
			<div className={s.login}>
				<div className={s.container}>
					<img className={s.logo} src={Logo} alt={this.props.global.systemTitleName} />
					<h2>{this.props.global.systemTitleName}</h2>
					<Form
						initialValues={{
							UserName: undefined,
							Password: undefined,
						}}
						onFinish={this.onFinish}
					>
						<FormItem
							className={s['form-item']}
							name="UserName"
							rules={[{ required: true, message: '请输入用户名!' }]}
						>
							<Input
								autoComplete="new-password"
								size="large"
								disabled={isLoading}
								placeholder="用户名"
								addonBefore={<UserOutlined />}
							/>
						</FormItem>

						<FormItem
							className={s['form-item']}
							name="Password"
							rules={[{ required: true, message: '请输入密码!' }]}
						>
							<Input.Password
								autoComplete="new-password"
								size="large"
								disabled={isLoading}
								placeholder="密码"
								addonBefore={<LockOutlined />}
							/>
						</FormItem>
						<FormItem>
							<Button
								loading={isLoading}
								className={s['login-btn']}
								type="primary"
								htmlType="submit"
							>
								登录
							</Button>
						</FormItem>
					</Form>
				</div>
			</div>
		);
	}
}

Login.propTypes = {
	global: PropTypes.object,
	history: PropTypes.object,
};
