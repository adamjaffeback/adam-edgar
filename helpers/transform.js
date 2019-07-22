const extractFromZip = require('./extractFromZip');
const load = require('./load');

async function rawDataToJson (sheetName, data) {
  let rows = data.split('\n');
  const headers = rows.splice(0, 1)[0].split('\t');
  rows = rows.map(row => row.split('\t'));

  const rowsAsJson = rows.map(row => {
    return row.reduce((acc, columnValue, index) => {
      let column = headers[index];
      acc[column] = columnValue;
      return acc;
    }, {});
  });

  await load.saveJson(rowsAsJson, sheetName);
  return rowsAsJson;
}

exports.zipToJson = async (fileName) => {
  /** @type {string[]} */
  const files = await extractFromZip.files(fileName);
  const listOfJson = [];
  for (let i = 0; i < files.length; i++) {
    let oneFile = files[i];
    let {fileName, data} = oneFile;
    let json = await rawDataToJson(fileName, data);
    listOfJson.push(json);
  }

  return listOfJson;
}
