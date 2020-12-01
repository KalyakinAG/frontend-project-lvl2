import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const fixturePath = path.join(process.cwd(), '__tests__', '__fixtures__');

const getFilePath = (fileName) => path.join(fixturePath, fileName);
const expectedFilePath = new Map();
expectedFilePath.set('json', fs.readFileSync(getFilePath('expected_file_json.txt'), 'utf8'));
expectedFilePath.set('plain', fs.readFileSync(getFilePath('expected_file_plain.txt'), 'utf8'));
expectedFilePath.set('stylish', fs.readFileSync(getFilePath('expected_file_stylish.txt'), 'utf8'));

describe.each`
  ext    | format | descr
  ${'json'} | ${'stylish'} | ${'diff for json'}
  ${'json'} | ${'plain'} | ${'diff for json'}
  ${'json'} | ${'json'} | ${'diff for json'}
  ${'yaml'} | ${'stylish'} | ${'diff for yaml'}
  ${'yaml'} | ${'plain'} | ${'diff for yaml'}
  ${'yaml'} | ${'json'} | ${'diff for yaml'}
  ${'ini'} | ${'stylish'} | ${'diff for ini'}
  ${'ini'} | ${'plain'} | ${'diff for ini'}
  ${'ini'} | ${'json'} | ${'diff for ini'}
`(`Params: ${'$ext -format $format'}`, ({ ext, format, descr }) => {
  test(`${descr}`, () => {
    const filePath1 = getFilePath(`file1.${ext}`);
    const filePath2 = getFilePath(`file2.${ext}`);
    expect(genDiff(filePath1, filePath2, format)).toEqual(expectedFilePath.get(format));
  });
});
