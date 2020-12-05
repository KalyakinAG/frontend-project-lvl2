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
  if (format === '.yml' || format === '.yaml') {
    return yaml.safeLoad;
  }
  if (format === '.ini') {
    return parseIni;
  }
  return JSON.parse;
};

const parse = (data, format) => getParser(format)(data);

export default parse;
