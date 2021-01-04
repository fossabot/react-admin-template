import { capitalCase } from 'change-case';

export default function appInfo(log?: boolean): void {
	const env = process.env.BUILD_ENV || '';
	const name = capitalCase(process.env.$__APP_NAME__$ || '');
	const gitBranch = process.env.$__GIT_BRANCH__$ || '';
	const version = process.env.$__APP_VERSION__$ || '';
	const prodBuildTime = process.env.$__APP_BUILD_TIME__$ || '';
	const devUpdateTime = new Date().toLocaleString();
	const time = env === 'development' ? `Refresh: ${devUpdateTime}` : `Build: ${prodBuildTime}`;

	if (log) {
		const style = 'padding:2px 4px;font-size:12px;font-weight:700';
		// eslint-disable-next-line no-unused-vars
		const br: (dir: string, size: number) => string = (dir: string, size: number) => {
			return `border-top-${dir}-radius:${size}px;border-bottom-${dir}-radius:${size}px`;
		};
		const nameStyle = `${style};color:#f90;background:#000;${br('left', 3)};`;
		const versionStyle = `${style};color:#fff;background:#007ec6;`;
		const envStyle = `${style};color:#fff;background:#3c1;`;
		const timeStyle = `${style};color:#fff;background:#dfb317;${br('right', 3)};`;
		window.console.log(
			`%c${name}%c${gitBranch}-v${version}%c${env}%c${time}`,
			nameStyle,
			versionStyle,
			envStyle,
			timeStyle,
		);
	}
}
