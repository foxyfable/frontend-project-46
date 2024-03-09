import { expect, test } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/index.js';

/*
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
*/

const extensions = ['yml', 'yaml', 'json'];

test.each(extensions)('genDiff test', (extension) => {
  const file1 = `__fixtures__/file1.${extension}`;
  const file2 = `__fixtures__/file2.${extension}`;
  expect(gendiff(file1, file2)).toEqual(
    `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`
  );
});
