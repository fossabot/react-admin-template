/**
 * 全局公共api
 */
import client from '../utils/request';

/**
 * 登录
 */
export function onLogin(data: { userName: string; password: string }) {
	return client.request({
		method: 'post',
		url: '/api/sugrec?prod=pc&from=pc_web&wd=hello world',
		background: true,
		data,
	});
}

/**
 * 退出
 */
export function onLogout() {
	return client.request({
		method: 'get',
		// url: '/api/auth/logout',
		url: '/api/sugrec?prod=pc&from=pc_web&wd=hello world',
	});
}
