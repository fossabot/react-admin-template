const webpack = require('webpack');

module.exports = function build(config) {
	return new Promise((resolve, reject) => {
		webpack(config, (err, stats) => {
			if (err) {
				reject(err);
			}

			const message = stats.toString({
				colors: true,
				modules: false,
				children: false,
				chunks: false,
				chunkModules: false,
			});

			if (stats.hasErrors()) {
				reject(message);
			}

			resolve(message);
		});
	})
}
