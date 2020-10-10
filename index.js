import path from 'path';
import fs from 'fs';

const genDiff = (filepath1, filepath2) => {
  const obj1 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), filepath1), 'utf8'));
  const obj2 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), filepath2), 'utf8'));
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
  console.log(strings.join('\n'));
};

export default genDiff;
