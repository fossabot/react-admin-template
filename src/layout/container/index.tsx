/**
 * 处理一些全局逻辑
 */
import React from 'react';
import { useLocation, useHistory } from 'react-router';
import useEnhancedEffect from '@/utils/use-enhanced-effect';
import { flattedRoutes } from '@/router';

interface IProps {
	children: React.ReactElement;
}

const Container: React.FC<IProps> = (props) => {
	const history = useHistory();
	const location = useLocation();

	useEnhancedEffect(() => {
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
			const match = flattedRoutes.find((route) => {
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

	return props.children;
};

export default Container;
