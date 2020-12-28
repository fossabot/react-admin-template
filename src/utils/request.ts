import { message } from 'antd';
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

import { httpCodeMap } from './index';
import baseUrls from '../config/base-urls';
import { ApiRequestError, ApiResponseError } from './errors';
import VanillaLoading from '../components/vanilla-loading';
import { IJSONLikeObject, IErrorData, IRequestConfig } from './interface';
import { objToStr, filterUndefinedNull, isObject } from './functions';

const loginPath = '/login';

class Request {
	private toast: VanillaLoading;
	private readonly env: string;
	private readonly isProd: boolean;
	private readonly customConfig: { background: boolean };
	private client: AxiosInstance;

	constructor(env = 'production', extraConfig?: IRequestConfig) {
		this.toast = new VanillaLoading();
		this.env = env;
		this.isProd = env === 'production';

		this.customConfig = {
			background: !!extraConfig?.background,
		};

		delete extraConfig?.background;

		this.client = axios.create({
			timeout: 60000,
			maxContentLength: 10 * 1024 ** 2,
			paramsSerializer: (params: IJSONLikeObject) => objToStr(params),
			...extraConfig,
		});

		this.configRequestInterceptors();
		this.configResponseInterceptors();

		console.log(`%cenv:    ${this.env}`, 'color:#0085fa;font-size:20px');
		console.log(`%cisProd: ${this.isProd}`, 'color:#0085fa;font-size:20px');
	}

	private configRequestInterceptors() {
		this.client.interceptors.request.use((config: IRequestConfig) => {
			if (!config.background) {
				this.toast.show();
			}

			return config;
		});
	}

	private configResponseInterceptors() {
		this.client.interceptors.response.use(
			(response) => {
				const config = response.config as IRequestConfig;

				if (!config.background) {
					this.toast.hide();
				}
				return response;
			},
			(error) => {
				const config = error.config as IRequestConfig;
				const response = error.response as AxiosResponse;

				if (!config.background) this.toast.hide();

				if (response) {
					const { status } = response;
					const { pathname, search } = window.location;

					if (status === 401 && pathname.replace(/\/$/, '') !== loginPath) {
						window.location.assign(
							`${loginPath}?redirect=${encodeURIComponent(pathname + search)}`,
						);
						return;
					}

					const errorData = response.data as IErrorData;
					const { Code, IsSuccess, Message } = errorData;
					// 此段根据具体项目具体修改。此处认为长度小于100的消息为有效消息
					// 有错误消息就抛出自定义状态码和错误消息
					// 否则就走后面流程，抛出http原生状态码和响应错误消息
					if ((Code === '-1' || !IsSuccess) && Message && Message.length < 100) {
						message.error(Message);
						return Promise.reject(new ApiRequestError(Number(Code), Message));
					}

					const { statusText } = response;
					const errorMessage = httpCodeMap.get(status) || statusText || '服务器出现未知错误';
					message.error(errorMessage);

					return Promise.reject(new ApiRequestError(status, errorMessage));
				}

				if (error.message.startsWith('timeout of ')) {
					message.error('请求超时');
					return Promise.reject(new ApiRequestError(408, '请求超时'));
				}

				message.error(error.message);
				return Promise.reject(new ApiRequestError(500, error.message));
			},
		);
	}

	public request(config: IRequestConfig) {
		const url = config.url?.replace(/^\//, '') || '';
		const apiHead: string = url.split('/')[0] || 'api';
		let baseConfig = baseUrls[apiHead];

		if (!isObject(baseConfig)) baseConfig = baseUrls.api;

		const baseUrl = baseConfig[this.env].replace(/\/$/, '');
		config.url = `${baseUrl}/${url}`;

		const { headers = {} } = config;

		delete config.headers;

		const relConfig = {
			withCredentials: true,
			headers: { ...headers },
			...this.customConfig,
			...config,
			params: {
				t: Date.now(),
				...filterUndefinedNull(config.params),
			},
			data: filterUndefinedNull(config.data),
		};

		console.log(config, '----------------RequestConfig');

		return this.client
			.request(relConfig)
			.then((response: AxiosResponse) => {
				const { data } = response;

				// 此段根据具体项目具体修改
				if (isObject(data)) {
					const { code, IsSuccess, Message } = data;
					if (IsSuccess === false) {
						return Promise.reject(
							new ApiResponseError(isNaN(Number(code)) ? -1 : Number(code), Message),
						);
					}
				}

				return response.data;
			})
			.catch((error: AxiosError) => Promise.reject(error));
	}
}

const client = new Request(process.env.NODE_ENV);

export { axios, Request };
export default client;
