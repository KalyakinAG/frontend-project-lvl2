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
  { dir: '1', format: '.json', descr: '±' },
  { dir: '2', format: '.json', descr: '+' },
  { dir: '3', format: '.json', descr: '-' },
  { dir: '4', format: '.yaml', descr: '±.yaml' },
];

tests.forEach((item) => test(`Тест ${item.descr}`, () => {
  expect(genDiff(`${filepath1}/${item.dir}/file1${item.format}`, `${filepath2}/${item.dir}/file2${item.format}`))
    .toEqual(fs.readFileSync(`${expectedFilePath}/${item.dir}/expected_file.txt`, 'utf8'));
}));
