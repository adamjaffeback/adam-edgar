const fs = require("fs");
const JSZip = require("jszip");

exports.zip = async fileName => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, async (err, data) => {
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
