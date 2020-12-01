import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const parseIni = (data) => {
  const convert = (objIn) => {
    const obj = {};
    Object.keys(objIn).forEach((key) => {
      const value = objIn[key];
      if (_.isObject(value)) {
        obj[key] = convert(value);
        return;
      }
      if (_.isString(value)) {
        const valueNum = _.toNumber(value);
        if (_.isFinite(valueNum)) {
          obj[key] = valueNum;
          return;
        }
      }
      obj[key] = value;
    });
    return obj;
  };
  const obj = ini.parse(data);
  return convert(obj);
};

const getParser = (format) => {
  let parse;
  if (format === '' || format === '.json') {
    parse = JSON.parse;
  } else if (format === '.yml' || format === '.yaml') {
    parse = yaml.safeLoad;
  } else if (format === '.ini') {
    parse = parseIni;
  }
  return parse;
};

const parse = (data, format) => getParser(format)(data);

export default parse;
