import format from './formatters/index.js';
import genPropertyDiff from './diff.js';

const genDiff = (obj1, obj2, formatName = 'stylish') => {
  const diff = genPropertyDiff(obj1, obj2);
  return format(diff, formatName);
};

export default genDiff;
