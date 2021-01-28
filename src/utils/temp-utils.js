/* eslint-disable */
/**
 * TS类型处理有点麻烦，先用JS写了，有时间再改成通用的
 * @param list
 * @param path
 * @returns {T[]|*[]}
 */
export function getParentsRouteByPath(list, path) {
	for (let i = 0; i < list.length; i++) {
		if (list[i].path === path) {
			return [list[i]];
		}
		if (list[i].children) {
			const nodes = getParentsRouteByPath(list[i].children, path);
			if (nodes) {
				return nodes.concat(list[i]);
			}
		}
	}
}
