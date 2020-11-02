import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

/* eslint-disable no-underscore-dangle */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filepath1 = `${__dirname}/./__fixtures__`;
const filepath2 = `${__dirname}/./__fixtures__`;
const expectedFilePath = `${__dirname}/./__fixtures__`;

const tests = [
  {
    dir: '1',
    ext: '.json',
    format: '',
    descr: '±json',
  },
  {
    dir: '2',
    ext: '.yaml',
    format: '',
    descr: '±.yaml',
  },
  {
    dir: '3',
    ext: '.ini',
    format: '',
    descr: '±.ini',
  },
  {
    dir: '4',
    ext: '.json',
    format: '',
    descr: '±.json stylish',
  },
  {
    dir: '5',
    ext: '.json',
    format: 'plain',
    descr: '±.json plain',
  },
];

test.each(tests)('Тест %o', (item) => {
  expect(genDiff(`${filepath1}/${item.dir}/file1${item.ext}`, `${filepath2}/${item.dir}/file2${item.ext}`, `${item.format}`))
    .toEqual(fs.readFileSync(`${expectedFilePath}/${item.dir}/expected_file.txt`, 'utf8'));
});
