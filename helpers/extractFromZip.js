const fs = require("fs");
const JSZip = require("jszip");
const extract = require('extract-zip');

async function _readZipMetaData (pathToZip) {
  return new Promise((resolve, reject) => {
    fs.readFile(pathToZip, async (err, data) => {
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

async function _unzipFile (pathToZip) {
  return new Promise((resolve, reject) => {
    extract(pathToZip, {dir: exports.getDir(pathToZip)}, err => {
      if (err) reject(err);
      resolve();
    })
  });
}

async function _readFileFromZip (pathToZip, fileNameInZip) {
  const dir = exports.getDir(pathToZip);

  const data = await new Promise((resolve, reject) => {
    fs.readFile(`${dir}/${fileNameInZip}`, 'utf-8', (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });

  // write string to fs as log
  await new Promise(resolve => {
    fs.writeFile(`${dir}/read-${fileNameInZip}`, data, err => {
      if (err) throw err;
      resolve();
    });
  });

  return {
    fileName: fileNameInZip,
    data,
  };
}

// path/to/2019q1/2019q1.zip => path/to/2019q1/
exports.getDir = pathToZip => pathToZip.substr(0, pathToZip.length - 10);

exports.files = async pathToZip => {
  const metaData = await _readZipMetaData(pathToZip);

  await _unzipFile(pathToZip);
  /** @type {string[]} */
  const fileNamesInZip = Object.keys(metaData.files)
                         // only keep txt data files
                         .filter(fileName => fileName.substr(-4) === '.txt');

  return Promise.all(fileNamesInZip.map(_readFileFromZip.bind(null, pathToZip)));
}
