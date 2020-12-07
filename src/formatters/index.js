import formatPlain from './plain.js';
import formatStylish from './stylish.js';

const getFormatter = (formatName) => {
  if (formatName === 'plain') {
    return formatPlain;
  }
  if (formatName === 'json') {
    return (diffNode) => JSON.stringify(diffNode, ' ', 2);
  }
  return formatStylish;
};

const format = (diffTree, formatName = '') => getFormatter(formatName)(diffTree);

export default format;
