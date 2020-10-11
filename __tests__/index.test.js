import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import genDiff from '../index.js';

/* eslint-disable no-underscore-dangle */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filepath1 = `${__dirname}/../__fixtures__`;
const filepath2 = `${__dirname}/../__fixtures__`;
const expectedFilePath = `${__dirname}/../__fixtures__`;

for (let i = 1; i <= 3; i += 1) {
  test(`Тест ${i}`, () => {
    expect(genDiff(`${filepath1}/${i}/file1.json`, `${filepath2}/${i}/file2.json`))
      .toEqual(fs.readFileSync(`${expectedFilePath}/${i}/expected_file.txt`, 'utf8'));
  });
}
