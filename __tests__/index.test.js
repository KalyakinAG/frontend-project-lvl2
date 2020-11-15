import path from 'path';
import fs from 'fs';
import parse from '../src/parsers.js';
import genDiff from '../src/index.js';

const fixturePath = path.join(process.cwd(), '__tests__', '__fixtures__');

const tests = [];
['json', 'yaml', 'ini'].forEach((ext) => {
  ['stylish', 'plain'].forEach((format) => tests.push({ ext, format }));
});

test.each(tests)('Тест %o', (item) => {
  const filePath1 = path.join(fixturePath, `file1.${item.ext}`);
  const filePath2 = path.join(fixturePath, `file2.${item.ext}`);
  const fileExpectedPath = path.join(fixturePath, `expected_file_${item.format}.txt`);
  const obj1 = parse(path.resolve(process.cwd(), filePath1));
  const obj2 = parse(path.resolve(process.cwd(), filePath2));
  expect(genDiff(obj1, obj2, item.format)).toEqual(fs.readFileSync(fileExpectedPath, 'utf8'));
});
