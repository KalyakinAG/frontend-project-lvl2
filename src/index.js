import fs from 'fs';
import path from 'path';
import format from './formatters/index.js';
import parse from './parsers.js';
import genPropertyDiff from './diff.js';

const getFileType = (filepath) => path.extname(filepath).substring(1);

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const obj1 = parse(fs.readFileSync(filepath1, 'utf8'), getFileType(filepath1));
  const obj2 = parse(fs.readFileSync(filepath2, 'utf8'), getFileType(filepath2));
  const diff = genPropertyDiff(obj1, obj2);
  return format(diff, formatName);
};

export default genDiff;
