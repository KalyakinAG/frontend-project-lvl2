import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const getParser = (format) => {
  let parse;
  if (format === '' || format === '.json') {
    parse = JSON.parse;
  } else if (format === '.yml' || format === '.yaml') {
    parse = yaml.safeLoad;
  } else if (format === '.ini') {
    parse = ini.parse;
  }
  return parse;
};

const parse = (filepath) => {
  const format = path.extname(filepath);
  const data = fs.readFileSync(filepath, 'utf8');
  return getParser(format)(data);
};

export default parse;
