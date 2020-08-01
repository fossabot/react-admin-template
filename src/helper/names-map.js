import { isArray } from '../utils/functions';

export default function namesMap(routes) {
	const titleMap = {};
	const breadcrumbNameMap = {};

	function travel(list) {
		list.forEach(route => {
			const { path, title, breadcrumbName } = route;
			titleMap[path] = title;
			breadcrumbNameMap[path] = breadcrumbName;

			if (isArray(route.routes)) travel(route.routes);
		});
	}

	travel(routes);

	return {
		titleMap,
		breadcrumbNameMap,
	};
}
