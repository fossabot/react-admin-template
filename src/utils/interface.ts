import { AxiosRequestConfig } from 'axios';

export interface IJSONLikeObject {
	[propName: string]: null | undefined | boolean | number | string;
}

export interface IErrorData {
	Code: string;
	IsSuccess: boolean;
	Message: string;
	Data: object;
}

export interface IRequestConfig extends AxiosRequestConfig {
	background?: boolean;
}
