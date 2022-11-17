const fs = require('fs');
const path = require('path');

const move = (dirPath) => {
  const directory = path.resolve(dirPath);

  const jpgFolder = path.resolve('./JPG');
  const heicFolder = path.resolve('./HEIC');
  const videoFolder = path.resolve('./Videos');

  fs.mkdirSync(heicFolder);
  fs.mkdirSync(jpgFolder);
  fs.mkdirSync(videoFolder);

  // MOVE HEIC IMAGES
  fs.readdirSync(directory).forEach((file) => {
    if (file.includes('.JPG')) {
      const oldPath = path.join(directory, file);
      const newPath = path.join(jpgFolder, file);

      fs.renameSync(oldPath, newPath);
    }

    if (file.includes('.HEIC')) {
      const oldPath = path.join(directory, file);
      const newPath = path.join(heicFolder, file);

      fs.renameSync(oldPath, newPath);
    }

    if (file.toUpperCase().includes('.MP4') || file.includes('.MOV')) {
      const oldPath = path.join(directory, file);
      const newPath = path.join(videoFolder, file);

      fs.renameSync(oldPath, newPath);
    }
  });
};

module.exports = move;
