/**
 * 非特殊情况，接口url都是当前部署域
 * 特殊情况在此配置
 * 假如支持不同服务接口，需要额外配置，此处预留接口，形如"/otherApi/**"
 * 也就是api开头的接口baseUrl全部走default对象，其他开头走其他对象
 */

const { origin } = window.location;

const baseUrls: { [key: string]: any } = {
	api: {
		development: origin,
		test: origin,
		production: origin,
	},
	otherApi: {}, // 此对象举例预留
};

export default baseUrls;
