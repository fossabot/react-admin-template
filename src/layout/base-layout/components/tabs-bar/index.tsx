/**
 * 标签页
 * @description 此处暂不做权限验证
 */
import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import { Divider } from 'antd';
import { useLocation, useHistory } from 'react-router';
import { useStore, useSelector } from 'react-redux';
import { flattedRoutes } from '@/router';
import useEnhancedEffect from '@/utils/use-enhanced-effect';
import ownerDocument from '@/utils/owner-document';
import { comparePathname } from '@/utils/functions';
import { RootState } from '@/redux/store';
import { ITabItem } from '@/redux/store/layout';
import s from './index.module.less';

const contextmenuWidth = 120;

const TabsBar: React.FC = () => {
	const store = useStore();
	const location = useLocation();
	const history = useHistory();
	const refTabs = useRef<HTMLUListElement | null>(null);
	const refContextmenu = useRef<HTMLUListElement | null>(null);
	const [position, setPosition] = useState({
		top: 0,
		left: 0,
	});
	const [isContextmenuVisible, setContextmenuVisible] = useState(false);
	const [menus] = useState([
		{ type: 'refresh', label: '刷新' },
		{ type: 'deep-refresh', label: '深度刷新' },
		{ type: 'divider', label: '' },
		{ type: 'close', label: '关闭' },
		{ type: 'close-others', label: '关闭其他' },
		{ type: 'close-all', label: '关闭所有' },
		{ type: 'close-left', label: '关闭左侧' },
		{ type: 'close-right', label: '关闭右侧' },
	]);
	const tabsList: ITabItem[] = useSelector((state: RootState) => state.layout.tabsList);

	useEnhancedEffect(() => {
		store.dispatch({
			type: 'layout/setTabsList',
			payload:  flattedRoutes
				.filter((item) => item.meta?.pin)
				.map(({ path, meta }) => {
					return {
						path,
						title: meta?.title,
						showInTabs: meta?.showInTabs,
						hidden: meta?.hidden,
						pin: meta?.pin,
					};
				}),
		});

		onAddTab(location.pathname);

		history.listen(({ pathname }) => {
			onAddTab(pathname);
		});

		const doc = ownerDocument(refContextmenu.current);

		refContextmenu.current?.addEventListener('click', onCancelAll);
		refContextmenu.current?.addEventListener('contextmenu', onCancelAll);
		doc.addEventListener('contextmenu', onClickAway);
		doc.addEventListener('click', onClickAway);

		return () => {
			refContextmenu.current?.removeEventListener('click', onCancelAll);
			refContextmenu.current?.removeEventListener('contextmenu', onCancelAll);
			doc.removeEventListener('contextmenu', onClickAway);
			doc.removeEventListener('click', onClickAway);
		};
	}, []);

	function onAddTab(pathname: string) {
		const flag = tabsList.some((item) => comparePathname(item.path, pathname));
		if (!flag) {
			const route = flattedRoutes.find((item) =>  comparePathname(item.path, pathname));
			if (route) {
				const { path, meta } = route;
				store.dispatch({
					type: 'layout/addTabItem',
					payload: {
						path,
						title: meta?.title,
						showInTabs: meta?.showInTabs,
						hidden: meta?.hidden,
						pin: meta?.pin,
					},
				});
				store.dispatch({
					type: 'layout/addTabItem',
					payload: null,
				});
			}
		}
	}

	function onContextMenu(event: React.MouseEvent, tabData: ITabItem) {
		event.preventDefault();
		event.stopPropagation();

		const rect = refTabs.current?.getBoundingClientRect();
		if (rect) {
			const { clientX, clientY } = event;
			const { top, left, width } = rect;

			if (clientX + contextmenuWidth - left + 4 < width) {
				setPosition({
					top: clientY - top + 2,
					left: clientX - left + 2,
				});
			} else {
				setPosition({
					top: clientY + 2,
					left: clientX - left - contextmenuWidth - 2,
				});
			}

			console.log(tabData);

			setContextmenuVisible(true);
		}
	}

	function onContextmenuItemClick(menu: { type: string; label: string; }) {
		console.log(menu);
		switch (menu.type) {
			case 'refresh':
				break;
			case 'deep-refresh':
				window.location.reload();
				break;
			case 'close':
				break;
			case 'close-others':
				break;
			case 'close-all':
				break;
			case 'close-left':
				break;
			case 'close-right':
				break;
			default:
				break;
		}
		setContextmenuVisible(false);
	}

	function onTabItemClick(data: ITabItem) {
		history.push(data.path);
	}

	function onCancelAll(event: MouseEvent) {
		event.preventDefault();
		event.stopPropagation();
	}

	function onClickAway() {
		setContextmenuVisible(false);
	}

	return (
		<div className={s.container}>
			<ul className={s.tabs} ref={refTabs}>
				{tabsList.map((tab) => (
					<li
						key={tab.path}
						className={classNames(s.tab, { [s.active]: comparePathname(tab.path, location.pathname) })}
						onContextMenu={(event) => onContextMenu(event, tab)}
						onClick={() => onTabItemClick(tab)}
					>
						{tab.title}
					</li>
				))}
			</ul>
			<ul
				ref={refContextmenu}
				style={{ width: contextmenuWidth, ...position, display: isContextmenuVisible ? '': 'none' }}
				className={s.contextmenu}
			>
				{menus.map(({ type, label }) => type === 'divider' ? <Divider className={s.divider} key={type} /> : (
					<li
						key={type}
						className={classNames(s.item)}
						onClickCapture={() => onContextmenuItemClick({ type, label })}
					>
						{label}
					</li>
				))}
			</ul>
		</div>
	);
};

export default TabsBar;
