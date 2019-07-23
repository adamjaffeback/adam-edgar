const https = require('https');
const fs = require('fs');
const path = require('path');

const formatName = (quarter, year) => `${year}q${quarter}`;

const makeOriginalZipName = (quarter, year) => `${formatName(quarter, year)}.zip`;

const makeUrl = (quarter, year) => `https://www.sec.gov/files/dera/data/\
financial-statement-data-sets/${makeOriginalZipName(quarter, year)}`;

async function _makeDirectory (quarter, year) {
  return new Promise((resolve, reject) => {
    const dirName = formatName(quarter, year);
    const dir = path.join(__dirname, '..', dirName);
    fs.mkdir(dir, err => {
      if (err && err.code !== 'EEXIST') {
        reject(err);
      } else {
        resolve(dir);
      }
    });
  });
}

exports.filing = async (quarter, year) => {
  return new Promise(async (resolve, reject) => {
    const fileName = makeOriginalZipName(quarter, year);
    const url = makeUrl(quarter, year);
    const dir = await _makeDirectory(quarter, year);
    const pathToFile = path.join(dir, fileName);
    const file = fs.createWriteStream(pathToFile);

    https.get(url, res => {
      if (res.statusCode !== 200) {
        reject(res);
      }

      res.on('data', async data => file.write(data))
      .on('end', async () => {
        file.end();
        resolve(pathToFile);
      });
    })
    .on('error', reject);
  });
}
