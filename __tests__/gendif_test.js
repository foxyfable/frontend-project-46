import { expect, test } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const path1 = path.join(__dirname, '..', '/__fixtures__/file1.json');
const path2 = path.join(__dirname, '..', '/__fixtures__/file2.json');

test('genDiff result', () => {
  expect(gendiff(path1, path2)).toEqual(
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
