const fs = require("fs");
const JSZip = require("jszip");

async function _readZipMetaData (fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(`./${fileName}`, async (err, data) => {
      if (err) reject(err);

      try {
        const fileMetaData = await JSZip.loadAsync(data);
        resolve(fileMetaData);
      } catch (e) {
        reject(e);
      }
    });
  });
}

async function _readFileFromZip (zipObj, fileNameInZip) {
  // TODO: write string to fs as log
  const data = await zipObj.file(fileNameInZip).async('string');
  return {
    fileName: fileNameInZip,
    data,
  };
}

exports.files = async (zipFileName) => {
  const metaData = await _readZipMetaData(zipFileName);
  /** @type {string[]} */
  const fileNamesInZip = Object.keys(metaData.files)
                         // only keep txt data files
                         .filter(fileName => fileName.substr(-4) === '.txt');

  return Promise.all(fileNamesInZip.map(_readFileFromZip.bind(null, metaData)));
}
