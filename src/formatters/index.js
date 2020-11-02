import formatPlain from './plain.js';
import formatStylish from './stylish.js';

const getFormatter = (formatName) => {
  if (formatName === 'plain') {
    return formatPlain;
  }
  return formatStylish;
};

const format = (diffTree, formatName = '') => getFormatter(formatName)(diffTree);

export default format;
