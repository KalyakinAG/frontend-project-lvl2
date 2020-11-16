import path from 'path';
import fs from 'fs';
import parse from '../src/parsers.js';
import genDiff from '../src/index.js';

const fixturePath = path.join(process.cwd(), '__tests__', '__fixtures__');

describe.each`
  ext    | format | descr
  ${'json'} | ${'stylish'} | ${'diff for json'}
  ${'json'} | ${'plain'} | ${'diff for json'}
  ${'yaml'} | ${'stylish'} | ${'diff for yaml'}
  ${'yaml'} | ${'plain'} | ${'diff for yaml'}
  ${'ini'} | ${'stylish'} | ${'diff for ini'}
  ${'ini'} | ${'plain'} | ${'diff for ini'}
`(`Params: ${'$ext -format $format'}`, ({ ext, format, descr }) => {
  test(`${descr}`, () => {
    const filePath1 = path.join(fixturePath, `file1.${ext}`);
    const filePath2 = path.join(fixturePath, `file2.${ext}`);
    const fileExpectedPath = path.join(fixturePath, `expected_file_${format}.txt`);
    const obj1 = parse(path.resolve(process.cwd(), filePath1));
    const obj2 = parse(path.resolve(process.cwd(), filePath2));
    expect(genDiff(obj1, obj2, format)).toEqual(fs.readFileSync(fileExpectedPath, 'utf8'));
  });
});
