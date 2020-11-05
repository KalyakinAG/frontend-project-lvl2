import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const fixturePath = path.join(process.cwd(), '__tests__', '__fixtures__');

const tests = [
  {
    ext: 'json',
    format: 'stylish',
  },
  {
    ext: 'json',
    format: 'plain',
  },
  {
    ext: 'yaml',
    format: 'stylish',
  },
  {
    ext: 'ini',
    format: 'stylish',
  },
];

test.each(tests)('Тест %o', (item) => {
  expect(genDiff(path.join(fixturePath, `file1.${item.ext}`), path.join(fixturePath, `file2.${item.ext}`), item.format))
    .toEqual(fs.readFileSync(path.join(fixturePath, `expected_file_${item.ext}_${item.format}.txt`), 'utf8'));
});
