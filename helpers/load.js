const fs = require('fs');
const jsonfile = require('jsonfile');

exports.saveJson = async (json, zipFileName) => {
  return new Promise(async (resolve, reject) => {
    // num.txt => num
    const withoutExtension = zipFileName.substr(0, zipFileName.length - 4);
    const jsonFileName = `./${withoutExtension}.json`;

    try {
      await jsonfile.writeFile(jsonFileName, json);
      resolve(`Successfully downloaded ${jsonFileName}.`);
    } catch (err) {
      reject(err);
    }
  });
}
