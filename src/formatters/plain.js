const isComplex = (value) => typeof value === 'object';

const formatValue = (obj) => {
  if (isComplex(obj)) {
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
      if (item.isComplex) {
        return item.properties.flatMap(getFormat(fullPath));
      }
      if (item.oper === '*') {
        return `Property '${fullPath}' was updated. From ${formatValue(item.valueFrom)} to ${formatValue(item.valueTo)}`;
      }
      if (item.oper === '-') {
        return `Property '${fullPath}' was removed`;
      }
      if (item.oper === '+') {
        return `Property '${fullPath}' was added with value: ${formatValue(item.value)}`;
      }
      return undefined;
    };
    return format;
  };
  return diff.flatMap(getFormat()).filter((item) => item !== undefined).join('\n');
};

export default formatPlain;
