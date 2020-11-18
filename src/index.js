import fs from 'fs';
import path from 'path';
import format from './formatters/index.js';
import parse from './parsers.js';
import genPropertyDiff from './diff.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const obj1 = parse(fs.readFileSync(filepath1, 'utf8'), path.extname(filepath1));
  const obj2 = parse(fs.readFileSync(filepath2, 'utf8'), path.extname(filepath2));
  const diff = genPropertyDiff(obj1, obj2);
  return format(diff, formatName);
};

export default genDiff;
