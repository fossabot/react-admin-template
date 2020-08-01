/**
 * 局部api
 */
import client from '../../../utils/request';

/**
 * 获取系统名称
 */
export function onGetSystemTitleName() {
	return client.request({
		method: 'get',
		url: '/api/SysCfg/GetSystemTitleName',
	});
}
