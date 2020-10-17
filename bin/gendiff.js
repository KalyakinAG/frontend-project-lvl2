#!/usr/bin/env node

import program from 'commander';
import genDiff from '../src/index.js';

program.version('1.0.0.1');
program.description('Compares two configuration files and shows a difference.');
program.option('-d, --debug', 'debug');
program.option('-f, --format [type]', 'output format');
program.arguments('<filepath1> <filepath2>');
program.action((filepath1, filepath2) => console.log(genDiff(filepath1, filepath2)));

program.parse(process.argv);
if (program.debug) {
  console.log(`Current directory: ${process.cwd()}`);
}
