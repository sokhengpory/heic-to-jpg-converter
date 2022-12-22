const Piscina = require('piscina');
const { readdir, rm, mkdir } = require('fs/promises');
const { resolve } = require('path');
const { chunkArray } = require('./utils');

const jpgDirectoryPath = resolve(`./Converted_JPG`);

async function imageConverter(dirPath) {
  await rm(jpgDirectoryPath, { recursive: true, force: true });

  const heicDir = await readdir(dirPath);
  const chunks = chunkArray(heicDir, Math.ceil(heicDir.length / 4));

  await mkdir(jpgDirectoryPath);

  const pool = new Piscina({ maxThreads: 4 });
  const options = { filename: resolve(__dirname, 'convertWorker.js') };

  await Promise.all([
    pool.run(chunks[0], options),
    pool.run(chunks[1], options),
    pool.run(chunks[2], options),
    pool.run(chunks[3], options),
  ]);
}

module.exports = imageConverter;
