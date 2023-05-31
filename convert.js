const Piscina = require('piscina');
const { readdir, rm, mkdir } = require('fs/promises');
const { resolve } = require('path');
const { chunkArray } = require('./utils');

const MAX_THREADS = 4;

async function imageConverter(dirPath) {
  const jpgDirectoryPath = resolve(`./Converted_JPG`);
  await rm(jpgDirectoryPath, { recursive: true, force: true });

  const heicDir = await readdir(dirPath);
  const chunks = chunkArray(heicDir, Math.ceil(heicDir.length / MAX_THREADS));

  await mkdir(jpgDirectoryPath);

  const pool = new Piscina({ maxThreads: MAX_THREADS });
  const options = { filename: resolve(__dirname, 'convertWorker.js') };

  await Promise.all(chunks.map((chunk) => pool.run(chunk, options)));
}

module.exports = imageConverter;
