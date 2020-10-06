#!/usr/bin/env node

import program from 'commander';

program.version('1.0.0.1');
program.description('Compares two configuration files and shows a difference.');
program.option('-d, --debug', 'debug');
program.option('-f, --format [type]', 'output format');
program.arguments('<filepath1> <filepath2>');

program.parse(process.argv);
if (program.debug) console.log(program.opts());
