#!/usr/bin/env node
const { program } = require('commander');
const rename = require('./rename');
const move = require('./move');
const webp = require('./webp');
const convert = require('./convert');

program.version('1.0.0');

program
  .command('convert')
  .description('Convert HEIC image to JPG')
  .argument('<directory path>', 'heic directory path')
  .action(async (path) => {
    let t = process.hrtime();
    await convert(path);
    t = process.hrtime(t);

    console.log(`Finished in ${t[0]}s`);
  });

program
  .command('webp')
  .description('Convert WEBP image to JPG')
  .argument('<directory path>', 'webp directory path')
  .action(async (path) => {
    await webp(path);
  });

program
  .command('rename')
  .description('Rename file from 0 to N')
  .argument('<directory path>', 'file directory path')
  .option('-s, --start [number]', 'number to start from', 0)
  .action((path, { start }) => {
    rename(path, Number(start));
  });

program
  .command('move')
  .description('Origanize image file by extension')
  .argument('<directory path>', 'Image directory path')
  .action((path) => {
    move(path);
  });

program.parseAsync();
