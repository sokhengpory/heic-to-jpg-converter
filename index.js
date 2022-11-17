#!/usr/bin/env node
const { program } = require('commander');
const convert = require('./convert');

program.version('1.0.0');

program
  .command('convert')
  .description('Convert HEIC image to JPG')
  .argument('<path>', 'heic directory path')
  .action(async (path) => {
    await convert(path);
  });

program.parseAsync();
