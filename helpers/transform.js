const xlsx = require('xlsx');

exports.rawDataToWorkbook = async data => {
  return new Promise((resolve, reject) => {
    try {
      const workbook = xlsx.read(data, {type: 'string'});
      resolve(workbook);
    } catch (e) {
      reject(e);
    }
  });
}

exports.workbooktoJson = async workbook => {
  return new Promise((resolve, reject) => {
    try {
      const json = xlsx.utils.sheet_to_json(workbook);
      resolve(json);
    } catch (e) {
      reject(e);
    }
  });
}
