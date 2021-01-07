const chalk = require('chalk');
const { printName, printPkgInfo, printEnvironment } = require('./printer');
const { nodeVersionCheck, buildEnvCheck, nodeEnvCheck } = require('./functions');

// logo
printName();

// Node Version
nodeVersionCheck();

// BUILD_ENV
buildEnvCheck();

// NODE_ENV
nodeEnvCheck();

console.log(chalk.gray(` 本次启动参数:`));
// env
printEnvironment();
console.log();
