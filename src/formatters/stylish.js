import _ from 'lodash';

const formatValue = (value, offset) => {
  const getFormat = (level = 0) => {
    const shift = `${offset}${' '.repeat(level * 4)}`;
    const format = (levelValue) => {
      if (_.isObject(levelValue)) {
        const lines = Object.keys(levelValue).map((key) => `${shift}      ${key}: ${getFormat(level + 1)(levelValue[key])}`);
        return [
          '{',
          ...lines,
          `${shift}  }`,
        ].join('\n');
      }
      return levelValue;
    };
    return format;
  };
  return getFormat()(value);
};

const formatStylish = (diff) => {
  const getFormat = (level = 1) => {
    const offset = ' '.repeat(level * 4 - 2);
    const format = (item) => {
      const symbolOfType = (type) => {
        switch (type) {
          case 'added':
            return '+';
          case 'deleted':
            return '-';
          case 'unchanged':
            return ' ';
          default:
            return ' ';
        }
      };
      if (item.isComplex) {
        return [
          `${offset}  ${item.name}: {`,
          ...item.properties.flatMap(getFormat(level + 1)),
          `${offset}  }`,
        ];
      }
      if (item.type === 'changed') {
        return [
          `${offset}- ${item.name}: ${formatValue(item.valueFrom, offset)}`,
          `${offset}+ ${item.name}: ${formatValue(item.valueTo, offset)}`,
        ];
      }
      return [
        `${offset}${symbolOfType(item.type)} ${item.name}: ${formatValue(item.value, offset)}`,
      ];
    };
    return format;
  };
  return `{\n${diff.flatMap(getFormat()).join('\n')}\n}`;
};

export default formatStylish;
