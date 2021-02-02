import { cliOptions } from '../../electron.config';

const { config: { productName, buildVersion } } = cliOptions;

export default {
	name: productName,
	version: buildVersion,
};
