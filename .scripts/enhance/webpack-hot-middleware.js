const hotClient = require('webpack-hot-middleware/client?timeout=200&overlay=true&reload=true');

hotClient.subscribe((event) => {
	/**
	 * Reload browser when HTMLWebpackPlugin emits a new index.html
	 *
	 * Currently disabled until jantimon/html-webpack-plugin#680 is resolved.
	 * https://github.com/SimulatedGREG/electron-vue/issues/437
	 * https://github.com/jantimon/html-webpack-plugin/issues/680
	 */
	if (event.action === 'reload') {
		// window.location.reload()

		const dom = document.querySelector('#webpack-hot-middleware-notice');
		if (dom) {
			dom.textContent = 'Compile Success!';

			setTimeout(() => {
				dom.offsetParent.removeChild(dom);
			}, 350);
		}
	}

	/**
	 * Notify `mainWindow` when `main` process is compiling,
	 * giving notice for an expected reload of the `electron` process
	 */
	if (event.action === 'compiling') {
		const style = `
			position: absolute;
			bottom: 20px;
			left: 20px;
			padding: 8px 12px;
			color: #f90;
			font-size: 16px;
			font-weight: 700;
			background: #000;
			border-radius: 4px;
			box-shadow: 0 4px 5px 0 #f90, 0 1px 10px 0 #f90;
		`;
		document.body.innerHTML += `
      <div id="webpack-hot-middleware-notice" style="${style}">Main Process Compiling...</div>
    `;
	}
});
