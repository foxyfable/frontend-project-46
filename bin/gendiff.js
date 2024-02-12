#!/usr/bin/env node

import gendiff from '../src/index.js';
import { Command } from 'commander';

const program = new Command();

program
  .name('gendiff')
  .version('1.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .argument('<filepath1> <filepath2>')
  .action((filepath1, filepath2, options) => {
    console.log(gendiff(filepath1, filepath2, options.type));
  });

program.parse();