/**
 * 目前次组件代码没有实际作用
 * 可根据项目场景做个体验降级或错误上报入口
 */

import React, { Component } from 'react';
import { message } from 'antd';
import PropTypes from 'prop-types';
import s from './index.module.less';

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			errorInfo: null,
		};
	}

	componentDidMount() {
		console.log('ErrorBoundary Did Mount');
	}

	componentDidCatch(error, errorInfo) {
		this.setState({ error, errorInfo });

		if (error) message.error(error.toString());

		console.error(error, errorInfo, '---->>>> From ErrorBoundary');
	}

	onGetErrorInfo(error, errorInfo) {
		return (
			<section className={s.container}>
				<div>
					<div className={s.title}>系统出错了，可打开控制台查看详情</div>
					<div className={s.tips}>
						此错误只有开发环境才会出现，线上环境会静默失败，假如能设计一个线上降级提示，也是极好的
					</div>
					<details className={s.details} open>
						{error && <div className={s['error-tips']}>错误信息: {error.toString()}</div>}
						<div className={s['error-stack']}>错误堆栈: {errorInfo.componentStack}</div>
					</details>
				</div>
			</section>
		);
	}

	render() {
		const { children } = this.props;
		const { error, errorInfo } = this.state;

		if (process.env.NODE_ENV === 'development' && error) {
			return this.onGetErrorInfo(error, errorInfo);
		}

		return children;
	}
}

ErrorBoundary.propTypes = {
	children: PropTypes.object,
};

export default ErrorBoundary;
