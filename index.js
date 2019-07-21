const validation = require('./helpers/inputValidation');
const extract = require('./helpers/extractFromSec');
const transform = require('./helpers/transform');
const load = require('./helpers/load');

module.exports = async function processEdgarData (quarter, year) {
  validation.checkQuarter(quarter);
  validation.checkYear(year);

  // download zip to file system
  /** @type {string} */
  const zipFileName = await extract.filing(quarter, year);
  /** @type {object} */
  const json = await transform.zipToJson(zipFileName);
  /** @type {Promise.<string>} */
  return load.saveJson(json, zipFileName);
}
