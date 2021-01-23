import { IRouterConfig } from '@/utils/render-routes';

export function flatRouterList(list: IRouterConfig[]) {
	const res: IRouterConfig[] = [];

	function travel(arr: IRouterConfig[]) {
		for (let i = 0; i < arr.length; i++) {
			const route = arr[i];
			const children = arr[i].children;

			res.push(route);

			if (children) {
				// delete arr[i].children;
				travel(children);
			}
		}
	}
	travel(list);

	return res;
}

export function checkPermissions(
	permissions?: string[],
	authorities?: string | string[],
	some?: boolean,
) {
	if (!permissions || !authorities) {
		return true;
	}

	if (typeof authorities === 'string') {
		return permissions.includes(authorities);
	}

	const authorizationRequired = authorities && authorities?.length > 0;

	if (!authorizationRequired) {
		return true;
	}

	return some
		? authorities?.some((value) => permissions?.includes(value))
		: authorities?.every((value) => permissions?.includes(value));
}
