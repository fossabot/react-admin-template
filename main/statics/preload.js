console.log('%c此段代码为Electron注入代码', 'color: #0085fa;font-size: 16px');

setTimeout(() => {
	document.title = 'Hello Electron';
}, 3000);
