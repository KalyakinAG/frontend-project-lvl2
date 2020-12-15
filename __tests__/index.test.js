import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const getFixturePath = (fileName) => {
  const fixturePath = path.join(process.cwd(), '__tests__', '__fixtures__');
  return path.join(fixturePath, fileName);
};

const expectedFiles = new Map();

beforeAll(() => {
  expectedFiles.set('json', fs.readFileSync(getFixturePath('expected_file_json.txt'), 'utf8'));
  expectedFiles.set('plain', fs.readFileSync(getFixturePath('expected_file_plain.txt'), 'utf8'));
  expectedFiles.set('stylish', fs.readFileSync(getFixturePath('expected_file_stylish.txt'), 'utf8'));
});

describe.each`
  ext
  ${'json'}
  ${'yaml'}
  ${'ini'}
`(`Формат данных: ${'$ext'}`, ({ ext }) => {
  describe.each`
    format
    ${'stylish'}
    ${'plain'}
    ${'json'}
  `(`Формат вывода: ${'$format'}`, ({ format }) => {
    test(`${ext} -f ${format}`, () => {
      const filePath1 = getFixturePath(`file1.${ext}`);
      const filePath2 = getFixturePath(`file2.${ext}`);
      expect(genDiff(filePath1, filePath2, format)).toEqual(expectedFiles.get(format));
    });
  });
});
