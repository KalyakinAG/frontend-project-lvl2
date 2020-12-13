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

const getParser = (type) => {
  switch (type) {
    case 'yml':
      return yaml.safeLoad;
    case 'yaml':
      return yaml.safeLoad;
    case 'ini':
      return parseIni;
    case 'json':
      return JSON.parse;
    default:
      throw new Error(`Неизвестный формат файла "${type}"`);
  }
};

const parse = (data, type) => getParser(type)(data);

export default parse;
