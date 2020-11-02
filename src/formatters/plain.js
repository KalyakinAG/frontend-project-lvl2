const formatPlain = (diffNode, fullPropertyParentName = '') => {
  const formatValue = (obj) => {
    if (obj.isComplex) {
      return '[complex value]';
    }
    if (typeof obj.value === 'string') {
      return `'${obj.value}'`;
    }
    return obj.value;
  };
  if (!diffNode.isComplex && diffNode.oper === ' ') {
    return '';
  }
  const fullPropertyName = `${fullPropertyParentName}${(diffNode.name === '' || fullPropertyParentName === '') ? '' : '.'}${diffNode.name}`;
  if (diffNode.oper === '*') {
    return `Property '${fullPropertyName}' was updated. From ${formatValue(diffNode.valueFrom)} to ${formatValue(diffNode.valueTo)}`;
  }
  if (diffNode.isComplex && diffNode.oper === ' ') {
    return diffNode.properties.flatMap((item) => formatPlain(item, `${fullPropertyName}`)).filter((item) => item !== '').join('\n');
  }
  return `Property '${fullPropertyName}' ${diffNode.oper === '-' ? 'was removed' : `was added with value: ${formatValue(diffNode)}`}`;
};

export default formatPlain;
