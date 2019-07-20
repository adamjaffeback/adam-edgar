const https = require('https');
const fs = require('fs');

const makeOriginalZipName = (quarter, year) => `${year}q${quarter}.zip`;

const makeUrl = (quarter, year) => `https://www.sec.gov/files/dera/data/\
financial-statement-data-sets/${makeOriginalZipName(quarter, year)}`;

exports.filing = async (quarter, year) => {
  return new Promise((resolve, reject) => {
    const fileName = makeOriginalZipName(quarter, year);
    const url = makeUrl(quarter, year);
    const file = fs.createWriteStream(fileName);

    https.get(url, res => {
      if (res.statusCode !== 200) {
        console.log('bad status',res.status);
        reject(res);
      }

      res.on('data', async data => file.write(data))
      .on('end', async () => {
        file.end();
        resolve(fileName);
      });
    })
    .on('error', reject);
  });
}
