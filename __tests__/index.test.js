import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const getFixturePath = (fileName) => {
  const fixturePath = path.join(process.cwd(), '__tests__', '__fixtures__');
  return path.join(fixturePath, fileName);
};

const expectedFiles = {};

beforeAll(() => {
  expectedFiles.json = fs.readFileSync(getFixturePath('expected_file_json.txt'), 'utf8');
  expectedFiles.plain = fs.readFileSync(getFixturePath('expected_file_plain.txt'), 'utf8');
  expectedFiles.stylish = fs.readFileSync(getFixturePath('expected_file_stylish.txt'), 'utf8');
});

describe.each`
  ext    | format | descr
  ${'json'} | ${'stylish'} | ${'diff for json (stylish)'}
  ${'json'} | ${'plain'} | ${'diff for json (plain)'}
  ${'json'} | ${'json'} | ${'diff for json (json)'}
  ${'yaml'} | ${'stylish'} | ${'diff for yaml (stylish)'}
  ${'yaml'} | ${'plain'} | ${'diff for yaml (plain)'}
  ${'yaml'} | ${'json'} | ${'diff for yaml (json)'}
  ${'ini'} | ${'stylish'} | ${'diff for ini (stylish)'}
  ${'ini'} | ${'plain'} | ${'diff for ini (plain)'}
  ${'ini'} | ${'json'} | ${'diff for ini (json)'}
`(`Params: ${'$ext -format $format'}`, ({ ext, format, descr }) => {
  test(`${descr}`, () => {
    const filePath1 = getFixturePath(`file1.${ext}`);
    const filePath2 = getFixturePath(`file2.${ext}`);
    expect(genDiff(filePath1, filePath2, format)).toEqual(expectedFiles[format]);
  });
});
