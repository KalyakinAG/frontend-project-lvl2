import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const parseIni = (data) => {
  const reducer = (convertedObj, [key, value]) => {
    if (_.isObject(value)) {
      return { ...convertedObj, [key]: Object.entries(value).reduce(reducer, {}) };
    }
    const valueNum = parseFloat(value);
    if (Number.isNaN(valueNum)) {
      return { ...convertedObj, [key]: value };
    }
    return { ...convertedObj, [key]: valueNum };
  };
  const obj = ini.parse(data);
  return Object.entries(obj).reduce(reducer, {});
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
