const fs = require('fs');

exports.saveJson = async (json, zipFileName) => {
  return new Promise(function(resolve, reject) {
    // num.txt => num
    const withoutExtension = zipFileName.substr(0, zipFileName.length - 4);
    const jsonFileName = `./${withoutExtension}.json`;

    // TODO: JSON.stringify runs out of memory
    fs.writeFile(jsonFileName, JSON.stringify(json), err => {
      if (err) reject(err);
      resolve(`Successfully downloaded ${jsonFileName}.`);
    });
  });
}
