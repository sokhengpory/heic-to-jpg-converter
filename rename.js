const fs = require('fs');
const path = require('path');

const rename = (dirPath, startNum) => {
  const renameFolder = path.resolve(dirPath);

  fs.readdirSync(renameFolder).forEach((file, i) => {
    const extensions = file.split('.')[1];

    fs.rename(
      path.join(renameFolder, file),
      path.join(renameFolder, `${startNum + i}.${extensions}`),
      (err) => {
        if (err) console.log(err);
      }
    );
  });
};

module.exports = rename;
