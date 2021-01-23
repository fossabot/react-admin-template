/**
 * 全局的逻辑统一在此处理
 */
import React, { useLayoutEffect } from 'react';
import { useLocation, useHistory } from 'react-router';
import { flatRoutes } from '@/router';

const Reactive: React.FC = () => {
	const history = useHistory();
	const location = useLocation();

	useLayoutEffect(() => {
		const title = document.title;
		setTitle(location.pathname, title);

		const unListen = history.listen(({ pathname }) => {
			setTitle(pathname, title);
		});

		return () => {
			unListen();
			document.title = title;
		};
	}, []);

	function setTitle(pathname: string, originTitle: string) {
		getTitle(pathname)
			.then((title) => {
				if (typeof title === 'string') {
					document.title = title;
				}
			})
			.catch(() => {
				document.title = originTitle;
			});
	}

	function getTitle(pathname: string) {
		return new Promise((resolve, reject) => {
			const match = flatRoutes.find((route) => {
				const path = route.path;

				return path.replace(/\/$/, '') === pathname.replace(/\/$/, '');
			});

			if (match && match.meta?.title) {
				resolve(match.meta.title);
			} else {
				reject();
			}
		});
	}

	return null;
};

export default Reactive;
