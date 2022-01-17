// prettier-ignore-start
const tsConfig = require('./tsconfig.json'); // eslint-disable-line
const tsConfigPaths = require('tsconfig-paths'); // eslint-disable-line

const baseUrl = './dist'; // Either absolute or relative path. If relative it's resolved to current working directory.
tsConfigPaths.register({
  baseUrl,
  paths: tsConfig.compilerOptions.paths,
});
