const { exiftool } = require('exiftool-vendored');
const convert = require('heic-convert');
const fs = require('fs/promises');
const path = require('path');
const { invalidTags } = require('./utils');

const getValidTags = (tags) => {
  return Object.keys(tags).reduce((acc, key) => {
    if (!invalidTags.includes(key)) {
      acc[key] = tags[key];
    }
    return acc;
  }, {});
};

async function imageConverter(heicImgDirectory) {
  try {
    const validTagsJson = path.join(__dirname, 'valid-tags.json');
    const exampleTagsBuffer = await fs.readFile(validTagsJson);
    const exampleTags = JSON.parse(exampleTagsBuffer);

    for (const heicImgName of heicImgDirectory) {
      const heicImgPath = path.resolve(`./${heicImgName}`);
      const heicInputImgBuffer = await fs.readFile(heicImgPath);

      const tags = await exiftool.read(heicImgPath);
      const validTags = getValidTags(tags, exampleTags);

      const heicOutputImgBuffer = await convert({
        buffer: heicInputImgBuffer,
        format: 'JPEG',
        quality: 1,
      });

      const jpgImgName = heicImgName.split('.')[0];
      const jpgImgPath = path.resolve(`./Converted_JPG/${jpgImgName}.jpg`);

      await fs.writeFile(jpgImgPath, heicOutputImgBuffer);
      await exiftool.write(jpgImgPath, validTags);
      await fs.rm(`${jpgImgPath}_original`);

      console.log(`${heicImgName} -> ${jpgImgName}.jpg: Done!`);
    }
  } catch (error) {
    console.log(error);
  } finally {
    exiftool.end();
  }
}

module.exports = imageConverter;
