import fs from 'fs';
import path from 'path';
import process from 'process';
import _ from 'lodash';
import parse from './parse.js';

const getFixturePath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync(getFixturePath(filepath), 'utf-8');
const getFiletype = (filepath) => path.extname(filepath).slice(1);

const gendiff = (path1, path2) => { // add type
  const data1 = readFile(path1);
  const data2 = readFile(path2);

  const file1 = parse(data1, getFiletype(path1));
  const file2 = parse(data2, getFiletype(path2));

  const sortedKeys = _.sortBy(_.union(Object.keys(file1), Object.keys(file2)));
  const resultArr = sortedKeys.map((key) => {
    if (!Object.hasOwn(file1, key)) {
      return { [`+ ${key}`]: file2[key] };
    }
    if (!Object.hasOwn(file2, key)) {
      return { [`- ${key}`]: file1[key] };
    }
    if (Object.hasOwn(file1, key) && Object.hasOwn(file2, key)) {
      if (_.isEqual(file1[key], file2[key])) {
        return { [`  ${key}`]: file2[key] };
      }
      return { [`- ${key}`]: file1[key], [`+ ${key}`]: file2[key] };
    }
    return null;
  });

  const resultObj = resultArr.reduce((obj, item) => Object.assign(obj, { ...item }), {});
  const formattedResult = (JSON.stringify(resultObj, null, ' '.repeat(2)).replace(/[",]/g, ''));

  return formattedResult;
};

export default gendiff;
