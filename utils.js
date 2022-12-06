const fs = require('fs/promises');

const createJpgFolder = async (directoryPath) => {
  try {
    await fs.access(directoryPath);
  } catch (error) {
    await fs.mkdir(directoryPath);
  }
};

module.exports = {
  createJpgFolder,
};
