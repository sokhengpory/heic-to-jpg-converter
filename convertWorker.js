const fs = require('fs/promises');
const path = require('path');
const convert = require('heic-convert');
const { exiftool } = require('exiftool-vendored');

const getValidTags = (tags, exampleTags) => {
  const exampleTagsKeys = Object.keys(exampleTags);
  const validTags = {};

  for (const key in tags) {
    if (exampleTagsKeys.includes(key)) {
      validTags[key] = tags[key];
    }
  }

  return validTags;
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

      const heicOutputImgBuffer = await convert({
        buffer: heicInputImgBuffer,
        format: 'JPEG',
        quality: 1,
      });

      const jpgImgName = heicImgName.split('.')[0];
      const jpgImgPath = path.resolve(`./Converted_JPG/${jpgImgName}.jpg`);

      await fs.writeFile(jpgImgPath, heicOutputImgBuffer);

      const validTags = getValidTags(tags, exampleTags);

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
