#!/usr/bin/env node

import program from 'commander';

program.version('1.0.0.1');
program.description('Compares two configuration files and shows a difference.');
program.option('-d, --debug', 'отладка');
program.parse(process.argv);
if (program.debug) console.log(program.opts());
