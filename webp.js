const webp = require('webp-converter');
const path = require('path');
const fs = require('fs/promises');
const { createJpgFolder } = require('./utils');

const displayResultMessage = (resultMessage) => {
  const messages = resultMessage.split('. ');
  const format = messages[2];
  const time = messages[0].split('\n')[0];
  const saved = messages[3].split('\n')[1];

  console.log(format);
  console.log(time);
  console.log(saved);

  console.log('\n');
};

async function webpConverter(dirPath) {
  try {
    const webpDirPath = path.resolve(dirPath);
    const webpDir = await fs.readdir(webpDirPath);

    const jpgDirPath = path.resolve('./Converted_JPG');
    await createJpgFolder(jpgDirPath);

    for (const webpImg of webpDir) {
      if (webpImg === 'Converted_JPG') continue;

      const webpImgPath = path.resolve(webpImg);

      const [name] = webpImg.split('.');
      const jpgImgPath = path.join(jpgDirPath, `${name}.jpg`);

      const result = await webp.dwebp(webpImgPath, jpgImgPath, '-o', '-v');

      displayResultMessage(result);
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = webpConverter;
