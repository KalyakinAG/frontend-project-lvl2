import path from 'path';
import parse from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const obj1 = parse(path.resolve(process.cwd(), filepath1));
  const obj2 = parse(path.resolve(process.cwd(), filepath2));
  const keys1 = new Set(Object.keys(obj1));
  const keys2 = new Set(Object.keys(obj2));
  const intersection = new Set([...keys1].filter((x) => keys2.has(x)));
  const diff1 = new Set([...keys1].filter((x) => !keys2.has(x)));
  const diff2 = new Set([...keys2].filter((x) => !keys1.has(x)));
  const strings = ['{'];
  diff1.forEach((key) => strings.push(` - ${key}: ${obj1[key]}`));
  intersection.forEach((key) => {
    if (obj1[key] === obj2[key]) {
      strings.push(`   ${key}: ${obj1[key]}`);
    } else {
      strings.push(` - ${key}: ${obj1[key]}`);
      strings.push(` + ${key}: ${obj2[key]}`);
    }
  });
  diff2.forEach((key) => strings.push(` + ${key}: ${obj2[key]}`));
  strings.push('}');
  return strings.join('\n');
};

export default genDiff;
