/**
 * @description: 样板
 * @author: jkSun
 * @date: 2020/5/13 14:07
 */
import React, { Component } from 'react';
import { Card, Button } from 'antd';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

import './store';
// 不会模块化。控制台查看差别。虽然支持，但是目前没有场景这么使用
// 非特殊情况请不要使用，因为css module支持:global
import './index.less';

@inject('global', 'page')
@observer
export default class Sample extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: false,
		};
	}

	onChangeLayout = () => {
		const {
			layoutConfig: { menuPosition: position },
			onSetLayoutConfig,
		} = this.props.global;

		onSetLayoutConfig({
			menuPosition: position === 'header' ? 'aside' : 'header',
			collapsed: Math.random() > 0.5,
		});
	};

	onChangeTheme = theme => {
		this.props.global.onChangeTheme(theme);
	};

	render() {
		const {
			history,
			page: { sample },
		} = this.props;
		console.log(sample);

		if (this.state.error) {
			throw new Error('这是一个错误');
		}

		return (
			<Card bordered={false}>
				<div className="btb-group">
					<Button type="primary" onClick={this.onChangeLayout}>
						菜单布局切换
					</Button>
					<Button type="primary" onClick={() => this.onChangeTheme('light')}>
						亮色主题
					</Button>
					<Button type="primary" onClick={() => this.onChangeTheme('dark')}>
						暗色主题
					</Button>
				</div>
				<div className="btb-group">
					<Button type="primary">
						<Link to="403">去403</Link>
					</Button>
					<Button type="primary" onClick={() => history.push('/404')}>
						去404
					</Button>
					<Button type="primary" onClick={() => history.push('/500')}>
						去500
					</Button>
					<Button type="primary" danger onClick={() => this.setState({ error: true })}>
						触发一个错误
					</Button>
				</div>
			</Card>
		);
	}
}

Sample.propTypes = {
	global: PropTypes.object,
	history: PropTypes.object,
	page: PropTypes.object,
};
