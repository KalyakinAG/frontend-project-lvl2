import _ from 'lodash';

const formatValue = (obj) => {
  if (_.isObject(obj)) {
    return '[complex value]';
  }
  if (_.isString(obj)) {
    return `'${obj}'`;
  }
  return obj;
};

const formatPlain = (diff) => {
  const getFormat = (parentPath = '') => {
    const format = (item) => {
      const fullPath = `${parentPath}${(parentPath === '' ? '' : '.')}${item.name}`;
      switch (item.type) {
        case 'nested':
          return item.properties.filter((item) => item.type !== 'unchanged').flatMap(getFormat(fullPath));
        case 'deleted':
          return `Property '${fullPath}' was removed`;
        case 'added':
          return `Property '${fullPath}' was added with value: ${formatValue(item.value)}`;
        case 'changed':
          return `Property '${fullPath}' was updated. From ${formatValue(item.valueFrom)} to ${formatValue(item.valueTo)}`;
        default:
          throw new Error(`Неизвестный тип узла ${item.type}`);
      }
    };
    return format;
  };
  return diff.filter((item) => item.type !== 'unchanged').flatMap(getFormat()).join('\n');
};

export default formatPlain;
