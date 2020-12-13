import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const parseIni = (data) => {
  const convert = (objIn) => {
    const objOut = {};
    Object.keys(objIn).forEach((key) => {
      const value = objIn[key];
      if (_.isObject(value)) {
        objOut[key] = convert(value);
        return;
      }
      const valueNum = parseFloat(value);
      if (Number.isNaN(valueNum)) {
        objOut[key] = value;
        return;
      }
      objOut[key] = valueNum;
    });
    return objOut;
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
