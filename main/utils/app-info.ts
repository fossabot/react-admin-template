import os from 'os';
import childProcess, { ExecSyncOptionsWithStringEncoding } from 'child_process';

function exec(cmd: string, options?: ExecSyncOptionsWithStringEncoding) {
	return childProcess.execSync(cmd, options).toString().trim();
}

const platform = `${os.hostname()} ${os.version()} ${os.platform()} ${os.arch()}`;
const { node, electron, chrome } = process.versions;
const { BUILD_ENV = '', APP_BUILD_TIME = '' } = process.env;
const gitBranch = exec('git rev-parse --abbrev-ref HEAD');
const gitCommitMsg = exec('git log -1 --pretty=%s%b');
const	gitCommitHash = exec('git show -s --format=%h');

console.log(`
	platform: ${platform}
	electron: ${electron}
	node: ${node}
	chrome: ${chrome}
	BUILD_ENV: ${BUILD_ENV}
	gitBranch: ${gitBranch}
	gitCommitMsg: ${gitCommitMsg}
	gitCommitHash: ${gitCommitHash}
	APP_BUILD_TIME: ${APP_BUILD_TIME}
`);

