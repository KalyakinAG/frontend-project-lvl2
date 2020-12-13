#!/usr/bin/env node

import program from 'commander';
import genDiff from '../src/index.js';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-d, --debug', 'debug')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, cmdObj) => {
    console.log(genDiff(filepath1, filepath2, cmdObj.format));
  });

program.parse(process.argv);
