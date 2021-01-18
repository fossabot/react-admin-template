const os = require('os');
const childProcess = require('child_process');

function exec(cmd, options) {
	return childProcess.execSync(cmd, options).toString().trim();
}
const { node, electron, chrome } = process.versions;
const { BUILD_ENV = '', APP_BUILD_TIME = '' } = process.env;
const gitBranch = exec('git rev-parse --abbrev-ref HEAD');
const gitCommitMsg = exec('git log -1 --pretty=%s%b');
const	gitCommitHash = exec('git show -s --format=%h');

function appInfo() {
	const style = 'padding:2px 4px;font-size:12px;font-weight:700';
	const br = (dir, size) => {
		return `border-top-${dir}-radius:${size}px;border-bottom-${dir}-radius:${size}px`;
	};
	const nameStyle = `${style};color:#f90;background:#000;${br('left', 3)};`;
	const versionStyle = `${style};color:#fff;background:#007ec6;`;
	const envStyle = `${style};color:#fff;background:#3c1;`;
	const timeStyle = `${style};color:#fff;background:#dfb317;${br('right', 3)};`;

	window.console.log(
		`%cOS: ${os.platform()} ${os.arch()}%cNode.js: ${node}%cElectron: ${electron}%cChrome: ${chrome}`,
		nameStyle,
		versionStyle,
		envStyle,
		timeStyle,
	);
	window.console.log(
		`%cBranch: ${gitBranch}(${gitCommitHash})%cCommit: ${gitCommitMsg}%c${BUILD_ENV}%cBuild: ${APP_BUILD_TIME}`,
		nameStyle,
		versionStyle,
		envStyle,
		timeStyle,
	);
	console.log('%c以上输出来自主进程注入', 'color: #0085fa;font-size:16px;');
}

appInfo();

