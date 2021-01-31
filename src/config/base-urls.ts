const { origin } = window.location;

export type IBuildEnvs = 'development' | 'test' | 'production';

export interface IBaseUrlsConfig {
	[key: string]: {
		development: string;
		test: string;
		production: string;
	}
}

/**
 * 多域统一管理，模式如下
 * 此处为base url配置，调用之处指定prefix将会使用对应配置，默认为api
 */
const baseUrls: IBaseUrlsConfig = {
	api: {
		development: origin,
		test: origin,
		production: origin,
	},
	trade: {
		development: origin,
		test: origin,
		production: origin,
	},
};

export default baseUrls;
