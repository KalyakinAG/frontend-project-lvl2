import formatPlain from './plain.js';
import formatStylish from './stylish.js';

const getFormatter = (formatName = 'stylish') => {
  switch (formatName) {
    case 'stylish':
      return formatStylish;
    case 'plain':
      return formatPlain;
    case 'json':
      return (diffNode) => JSON.stringify(diffNode, ' ', 2);
    default:
      throw new Error(`Неизвестное имя формата "${formatName}"`);
  }
};

const format = (diffTree, formatName = '') => getFormatter(formatName)(diffTree);

export default format;
