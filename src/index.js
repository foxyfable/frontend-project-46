import fs from 'fs';
import path from 'path';
import process from 'process';
import parse from './parse.js';

const getFixturePath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync(getFixturePath(filepath), 'utf-8');
const getFiletype = (filepath) => path.extname(filepath).slice(1);

const gendiff = (path1, path2, type) => {
  const data1 = readFile(path1);
  const data2 = readFile(path2);

  const file1 = parse(data1, getFiletype(filepath1));
  const file2 = parse(data2, getFiletype(filepath2));

  return `${file1} ${file2}`;
};

export default gendiff;