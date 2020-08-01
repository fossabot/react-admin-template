import { IJSONLikeObject } from './interface';

export const getType = (value: any) => Object.prototype.toString.call(value).slice(8, -1);
export const isBoolean = (value: any) => typeof value === 'boolean';
export const isNumber = (value: any) => typeof value === 'number' && !isNaN(value);
export const isString = (value: any) => typeof value === 'string';
export const isArray = (value: any) => Array.isArray(value);
export const isObject = (value: any) => getType(value) === 'Object';
export const isBlob = (value: any) => getType(value) === 'Blob';
export const isArrayBuffer = (value: any) => getType(value) === 'ArrayBuffer';

export function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export function getQueryString(name: string) {
	const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
	const result = reg.exec(window.location.search.substr(1));
	if (result != null) {
		return decodeURIComponent(result[2]);
	}
	return null;
}

export function objToStr(obj: IJSONLikeObject) {
	return Object.entries(obj)
		.reduce((res: string[], [key, value]) => {
			res.push(`${key}=${value}`);
			return res;
		}, [])
		.join('&');
}

export function filterUndefinedNull(obj: { [propName: string]: any }) {
	if (!isObject(obj)) return obj;

	const res: { [propName: string]: any } = {};

	Object.keys(obj).forEach(key => {
		if (obj[key] === undefined || obj[key] === null) return;

		res[key] = obj[key];
	});

	return res;
}
