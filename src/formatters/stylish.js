import _ from 'lodash';

const formatValue = (value, offset) => {
  const getFormat = (level = 0) => {
    const shift = `${offset}${' '.repeat(level * 4)}`;
    const format = (levelValue) => {
      if (_.isPlainObject(levelValue)) {
        const lines = Object.keys(levelValue)
          .map((key) => `${shift}      ${key}: ${getFormat(level + 1)(levelValue[key])}`);
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
      switch (item.type) {
        case 'nested':
          return [
            `${offset}  ${item.name}: {`,
            ...item.properties.flatMap(getFormat(level + 1)),
            `${offset}  }`,
          ];
        case 'added':
          return [`${offset}+ ${item.name}: ${formatValue(item.value, offset)}`];
        case 'deleted':
          return [`${offset}- ${item.name}: ${formatValue(item.value, offset)}`];
        case 'unchanged':
          return [`${offset}  ${item.name}: ${formatValue(item.value, offset)}`];
        case 'changed':
          return [
            `${offset}- ${item.name}: ${formatValue(item.valueFrom, offset)}`,
            `${offset}+ ${item.name}: ${formatValue(item.valueTo, offset)}`,
          ];
        default:
          throw new Error(`Неизвестный тип узла ${item.type}`);
      }
    };
    return format;
  };
  return `{\n${diff.flatMap(getFormat()).join('\n')}\n}`;
};

export default formatStylish;
