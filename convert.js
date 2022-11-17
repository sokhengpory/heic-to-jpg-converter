const fs = require('fs/promises');
const path = require('path');
const convert = require('heic-convert');
const { exiftool } = require('exiftool-vendored');

(async () => {
  try {
    const exampleTagsBuffer = await fs.readFile('./valid-tags.json');
    const exampleTags = JSON.parse(exampleTagsBuffer);
    const exampleTagsKeys = Object.keys(exampleTags);

    const heicImgDirectoryPath = path.resolve('./HEIC');
    const heicImgDirectory = await fs.readdir(heicImgDirectoryPath);

    for (const heicImgName of heicImgDirectory) {
      const heicImgPath = path.resolve(`./HEIC/${heicImgName}`);
      const heicInputImgBuffer = await fs.readFile(heicImgPath);
      const tags = await exiftool.read(heicImgPath);

      const heicOutputImgBuffer = await convert({
        buffer: heicInputImgBuffer,
        format: 'JPEG',
        quality: 1,
      });

      const jpgImgName = heicImgName.split('.')[0];
      const jpgImgPath = path.resolve(`./JPG/${jpgImgName}`);
      await fs.writeFile(`${jpgImgPath}.jpg`, heicOutputImgBuffer);

      const validTags = {};
      for (const key in tags) {
        if (exampleTagsKeys.includes(key)) {
          validTags[key] = tags[key];
        }
      }

      await exiftool.write(`${jpgImgPath}.jpg`, validTags);
      await fs.rm(`${jpgImgPath}.jpg_original`);

      console.log(`${heicImgName} -> ${jpgImgName}.jpg: Done!`);
    }
  } catch (error) {
    console.log(error);
  } finally {
    exiftool.end();
  }
})();
