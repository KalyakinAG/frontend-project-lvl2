import formatPlain from './plain.js';
import formatStylish from './stylish.js';

const getFormatter = (formatName = 'stylish') => {
  if (formatName === 'stylish') {
    return formatStylish;
  }
  if (formatName === 'plain') {
    return formatPlain;
  }
  if (formatName === 'json') {
    return (diffNode) => JSON.stringify(diffNode, ' ', 2);
  }
  throw new SyntaxError(`Неизвестное имя формата "${formatName}"`);
};

const format = (diffTree, formatName = '') => getFormatter(formatName)(diffTree);

export default format;
