import _ from 'lodash';

const formatValue = (obj) => {
  if (_.isObject(obj)) {
    return '[complex value]';
  }
  if (typeof obj === 'string') {
    return `'${obj}'`;
  }
  return obj;
};

const formatPlain = (diff) => {
  const getFormat = (parentPath = '') => {
    const format = (item) => {
      const fullPath = `${parentPath}${(parentPath === '' ? '' : '.')}${item.name}`;
      if (item.type === 'nested') {
        return item.properties.flatMap(getFormat(fullPath));
      }
      if (item.type === 'deleted') {
        return `Property '${fullPath}' was removed`;
      }
      if (item.type === 'added') {
        return `Property '${fullPath}' was added with value: ${formatValue(item.value)}`;
      }
      if (item.type === 'changed') {
        return `Property '${fullPath}' was updated. From ${formatValue(item.valueFrom)} to ${formatValue(item.valueTo)}`;
      }
      return undefined;
    };
    return format;
  };
  return diff.flatMap(getFormat()).filter((item) => item !== undefined).join('\n');
};

export default formatPlain;
