import qs from 'qs';
import axios, {
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
	AxiosError,
} from 'axios';
import baseUrls, { IBuildEnvs } from '@/config/base-urls';
import ApiResponseException from './exception';

interface ICommonObject {
	[key: string]: string
}

interface IAxiosRequestConfig extends AxiosRequestConfig {
	format?: 'json' | 'urlencoded' | 'formdata';
	background?: boolean;
	fullResponse?: boolean;
	headers?: {
		[key: string]: any;
	};
	params?: {
		[key: string]: any;
	};
	data?: string | FormData | {
		[key: string]: any;
	};
}

const codeMessageMap = new Map([
	[200, '服务器成功返回请求的数据。'],
	[201, '新建或修改数据成功。'],
	[202, '一个请求已经进入后台排队（异步任务）。'],
	[204, '删除数据成功。'],
	[400, '请求不正确。'],
	[401, '没有登录。'],
	[403, '没有权限。'],
	[404, '发出的请求针对的是不存在的记录，服务器没有进行操作。'],
	[406, '请求的格式不可得。'],
	[408, '请求超时'],
	[410, '请求的资源被永久删除，且不会再得到的。'],
	[413, '发送内容过大。'],
	[422, '当创建一个对象时，发生一个验证错误。'],
	[500, '服务器内部错误。'],
	[502, '网关错误。'],
	[503, '服务不可用，服务器暂时过载或维护。'],
	[504, '网关超时。'],
]);

function errorHandler(error: AxiosError) {
	const config = error.config as IAxiosRequestConfig;
	const response = error.response;
	const status = response?.status;
	const serverMessage = ((response?.data) as unknown as ICommonObject)?.message;
	const codeMessage = status ? codeMessageMap.get(status) : '';
	const message = serverMessage || codeMessage || error.message || '未知错误';

	if (config?.background) {
		// @todo 隐藏菊花图动作
	}

	if (status) {
		// @todo message
		if (status === 401) {
			// @todo 登陆
		}

		if (status === 403) {
			// @todo 权限不足
		}

		return Promise.reject(new ApiResponseException(message, status));
	}

	if (error.message.startsWith('timeout of ')) {
		return Promise.reject(new ApiResponseException(message, 408));
	}

	return Promise.reject(new ApiResponseException(message, status || -1));
}

class Request {
	private readonly env: IBuildEnvs;
	private readonly client: AxiosInstance;
	private readonly customConfig: { format: string; background: boolean; fullResponse: boolean };

	constructor(env: IBuildEnvs, config?: IAxiosRequestConfig) {
		this.env = env;

		this.customConfig = {
			format: config?.format || 'json',
			background: !!config?.background,
			fullResponse: !!config?.fullResponse,
		};

		delete config?.format;
		delete config?.background;
		delete config?.fullResponse;

		this.client = axios.create({
			timeout: 0, // 永不超时
			withCredentials: true, // 携带cookie
			paramsSerializer: (params: any) => qs.stringify(params),
			...config,
		});
		this.useRequestInterceptors();
		this.useResponseInterceptors();
	}

	useRequestInterceptors() {
		this.client.interceptors.request.use(
			(config: IAxiosRequestConfig) => {
				if (config?.background) {
					// @todo message
				}

				return config;
			},
			(error: AxiosError) => {
				console.log(error);
			},
		);
	}
	useResponseInterceptors() {
		this.client.interceptors.response.use(
			(response: AxiosResponse) => {
				const config = response.config as IAxiosRequestConfig;
				if (config?.background) {
					// @todo 隐藏菊花图动作
				}
				// 其他自定义业务处理
				return response;
			},
			(error: AxiosError) => {
				return errorHandler(error);
			},
		);
	}

	request(config: IAxiosRequestConfig) {
		const relConfig = { ...this.customConfig, ...config };
		const url = relConfig.url?.replace(/^\//, '') || '';
		const apiPrefix = url.split('/')[0] || 'api';
		const baseUrlConfig = baseUrls?.[apiPrefix] || baseUrls.api;
		const baseUrl = baseUrlConfig?.[this.env].replace(/\/$/, '');

		relConfig.url = `${baseUrl}/${url}`;

		const { method, headers = {}, format = 'json', params, data } = relConfig;

		if (!method || method.toLowerCase() === 'get' || method.toLowerCase() === 'head') {
			if (params) {
				params.timestamp = Date.now();
			} else {
				relConfig.params = { timestamp: Date.now() };
			}
		}

		// 不校验method
		if (data) {
			// @todo FormData
			// if (format.toLowerCase() === 'formdata') {
			// 	body = transformToFormData(body);
			// }

			// urlencoded
			if (format.toLowerCase() === 'urlencoded') {
				relConfig.data = qs.stringify(data);
				headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
			}
		}

		console.log(relConfig, headers);

		return this.client
			.request(relConfig)
			.then((response: AxiosResponse) => {
				if (relConfig.fullResponse) {
					return response;
				}

				return response.data;
			})
			.catch((error) => {
				return Promise.reject(error);
			});
	}
}

const client = new Request(process.env.BUILD_ENV as IBuildEnvs);

export { axios, Request };
export default client;
