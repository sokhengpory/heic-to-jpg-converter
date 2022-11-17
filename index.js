#!/usr/bin/env node
const { program } = require('commander');
const convert = require('./convert');
const rename = require('./rename');
const move = require('./move');

program.version('1.0.0');

program
  .command('convert')
  .description('Convert HEIC image to JPG')
  .argument('<directory path>', 'heic directory path')
  .action(async (path) => {
    await convert(path);
  });

program
  .command('rename')
  .description('Rename file from 0 to N')
  .argument('<directory path>', 'file directory path')
  .action((path) => {
    rename(path);
  });

program
  .command('move')
  .description('Origanize image file by extension')
  .argument('<directory path>', 'Image directory path')
  .action((path) => {
    move(path);
  });

program.parseAsync();
