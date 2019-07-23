const fs = require('fs');
const jsonfile = require('jsonfile');

exports.saveJson = async (json, target) => {
  return new Promise(async (resolve, reject) => {
    try {
      await jsonfile.writeFile(target, json);
      resolve(`Successfully downloaded ${target}.`);
    } catch (err) {
      reject(err);
    }
  });
}
