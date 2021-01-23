import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router';
import { flatRoutes } from '@/router';

interface IProps {
	children: React.ReactElement;
}

const Container: React.FC<IProps> = (props) => {
	const history = useHistory();
	const location = useLocation();

	useEffect(() => {
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
		getTitle(pathname).then((title) => {
			if (typeof title === 'string') {
				document.title = title;
			}
		}).catch(() => {
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

	return props.children;
};

export default Container;
