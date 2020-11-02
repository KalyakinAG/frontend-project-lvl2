const formatStylish = (diffNode, level = 0) => {
  if (diffNode.oper === '*') {
    return [formatStylish(diffNode.valueFrom, level), formatStylish(diffNode.valueTo, level)].join('\n');
  }
  if (diffNode.isComplex) {
    return [
      level === 0 ? '{' : `${' '.repeat(level * 4 - 2)}${diffNode.oper} ${diffNode.name}: {`,
      ...diffNode.properties.flatMap((item) => formatStylish(item, level + 1)),
      `${' '.repeat(level * 4)}}`,
    ].join('\n');
  }
  return `${' '.repeat(level * 4 - 2)}${diffNode.oper} ${diffNode.name}: ${diffNode.value}`;
};

export default formatStylish;
