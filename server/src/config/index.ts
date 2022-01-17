import convict from 'convict';
import dotenv from 'dotenv';
import path from 'path';
import yaml from 'js-yaml';
import logger from 'src/utils/logger';

const yamlLoad = (string: string) => {
  return yaml.load(string, { schema: yaml.DEFAULT_FULL_SCHEMA });
};

convict.addParser({
  extension: 'yml',
  parse: yamlLoad,
});

dotenv.config();

const config = convict(path.join(__dirname, 'schema.yml'));
const stage = config.get('env') as string;

logger.info(`Current ENV: ${stage}`);

config.loadFile(path.join(__dirname, `${stage}.yml`));
config.validate({ allowed: 'warn' });

// console.log('Config:', config.toString())

export default config;
