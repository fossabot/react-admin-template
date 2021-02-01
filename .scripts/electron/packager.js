const { build } = require('electron-builder');

build(require('./config'))
	.then((res) => {
		console.log(res);
	})
	.catch((err) => {
		console.log(err);
		process.exit(1);
	})
	.finally(() => {
		process.exit(0);
	});
