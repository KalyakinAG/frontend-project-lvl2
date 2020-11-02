import formatPlain from './plain.js';
import formatStylish from './stylish.js';
import formatJSON from './JSON.js';

const getFormatter = (formatName) => {
  if (formatName === 'plain') {
    return formatPlain;
  }
  if (formatName === 'json') {
    return formatJSON;
  }
  return formatStylish;
};

const format = (diffTree, formatName = '') => getFormatter(formatName)(diffTree);

export default format;
