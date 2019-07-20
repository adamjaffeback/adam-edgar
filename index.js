const validation = require('./helpers/inputValidation');
const extract = require('./helpers/extract');
const read = require('./helpers/read');

module.exports = async function processEdgarData (quarter, year) {
  validation.checkQuarter(quarter);
  validation.checkYear(year);

  const fileName = await extract.filing(quarter, year);
  const fileData = await read.zip(fileName);
  return fileData;
}
