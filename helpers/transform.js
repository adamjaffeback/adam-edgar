const extractFromZip = require('./extractFromZip');
const load = require('./load');

async function rawDataToJson (pathToZip, sheetName, data) {
  const headers = data.split('\n')[0].split('\t');
  let rows = data.replace(/\t\n/g, `\tundefined\n`);
  rows = rows.split('\n');
  rows.shift();
  rows = rows.map(row => row.split('\t'));

  const rowsAsJson = rows.map(row => {
    return row.reduce((acc, columnValue, index) => {
      let column = headers[index];
      acc[column] = columnValue;
      return acc;
    }, {});
  });

  // num.txt => num
  const withoutExtension = sheetName.substr(0, sheetName.length - 4);
  const jsonFileName = `${extractFromZip.getDir(pathToZip)}/${withoutExtension}.json`;
  await load.saveJson(rowsAsJson, jsonFileName);
  return rowsAsJson;
}

exports.zipToJson = async (pathToZip) => {
  /** @type {string[]} */
  const files = await extractFromZip.files(pathToZip);
  const listOfJson = [];
  for (let i = 0; i < files.length; i++) {
    let oneFile = files[i];
    let {fileName, data} = oneFile;
    let json = await rawDataToJson(pathToZip, fileName, data);
    listOfJson.push(json);
  }

  return listOfJson;
}
