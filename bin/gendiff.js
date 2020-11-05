#!/usr/bin/env node

import program from 'commander';
import genDiff from '../src/index.js';

program.version('1.0.0');
program.description('Compares two configuration files and shows a difference.');
program.option('-d, --debug', 'debug');
program.option('-f, --format [type]', 'output format', 'stylish');
program.arguments('<filepath1> <filepath2>');
program.action((filepath1, filepath2, cmdObj) => {
  console.log(genDiff(filepath1, filepath2, cmdObj.format));
});

program.parse(process.argv);
if (program.debug) {
  console.log(`Current directory: ${process.cwd()}`);
}
