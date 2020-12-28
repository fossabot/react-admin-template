import React, { Component } from 'react';
import { Menu } from 'antd';
import { GithubOutlined, LinkOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import menuList from '../../config/menu';

const { SubMenu, Item: MenuItem } = Menu;

@withRouter
@inject('global')
@observer
export default class GlobalMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openKeys: [],
		};
	}

	onMenuOpenChange = (keys) => {
		const { position, inlineCollapsed } = this.props;

		if (position !== 'aside' || inlineCollapsed) return;
		const { openKeys } = this.state;
		const latestOpenKey = keys.find((key) => !openKeys.includes(key));
		if (!menuList.some((item) => item.id === latestOpenKey)) {
			this.setState({
				openKeys: keys,
			});
		} else {
			this.setState({
				openKeys: latestOpenKey ? [latestOpenKey] : [],
			});
		}
	};

	onMenuSelect = ({ item }) => {
		const { history } = this.props;
		const url = item.props.data.url || '/';
		history.push(url);
	};

	renderMenuItem = (list, level = 0) => {
		const { position } = this.props;
		const isAside = position === 'aside';
		return list.map((item) => {
			const hasSubMenu = item.children && item.children.length > 0;

			if (hasSubMenu) {
				return (
					<SubMenu
						popupClassName="menu-popup-container"
						key={item.id}
						icon={isAside ? <GithubOutlined style={{ fontSize: 16 }} /> : null}
						title={<span>{item.title}</span>}
					>
						{this.renderMenuItem(item.children, level + 1)}
					</SubMenu>
				);
			}

			return (
				<MenuItem key={item.id} icon={level === 0 ? <LinkOutlined /> : null} data={item}>
					{item.title}
				</MenuItem>
			);
		});
	};

	render() {
		const { className, mode, position, inlineCollapsed } = this.props;
		const { openKeys } = this.state;

		const menuProps = {};
		if (mode !== undefined) menuProps.mode = mode;
		if (inlineCollapsed !== undefined) menuProps.inlineCollapsed = inlineCollapsed;
		if (position === 'aside' && inlineCollapsed === false) {
			menuProps.openKeys = openKeys;
		} else {
			delete menuProps.openKeys;
		}

		return (
			<Menu
				inlineIndent={12}
				className={className}
				{...menuProps}
				onOpenChange={this.onMenuOpenChange}
				onSelect={this.onMenuSelect}
			>
				{this.renderMenuItem(menuList, 0)}
			</Menu>
		);
	}
}

GlobalMenu.propTypes = {
	global: PropTypes.object,
	position: PropTypes.string,
	history: PropTypes.object,
	className: PropTypes.string,
	mode: PropTypes.string,
	theme: PropTypes.string,
	inlineCollapsed: PropTypes.bool,
};
