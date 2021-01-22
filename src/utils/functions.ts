export const keep = 'keep'; // 占位只有一个的时候 import/prefer-default-export

export function checkPermissions(permissions?: string[], authorities?: string | string[], some?: boolean) {
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

	return some ?
		authorities?.some((value) => permissions?.includes(value)) :
		authorities?.every((value) => permissions?.includes(value));
}
