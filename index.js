const validation = require('./helpers/inputValidation');
const fetch = require('./helpers/fetch');
const read = require('./helpers/read');

module.exports = async function processEdgarData (quarter, year) {
  validation.checkQuarter(quarter);
  validation.checkYear(year);

  const fileName = await fetch.filing(quarter, year);
  const fileData = await read.zip(fileName);
  return fileData;
}
