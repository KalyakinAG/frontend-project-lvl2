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

const parse = (data, format) => getParser(format)(data);

export default parse;
