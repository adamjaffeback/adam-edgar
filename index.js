const validation = require('./helpers/inputValidation');
const extractFromSec = require('./helpers/extractFromSec');
const extractFromZip = require('./helpers/extractFromZip');
const transform = require('./helpers/transform');
const load = require('./helpers/load');

module.exports = async function processEdgarData (quarter, year) {
  validation.checkQuarter(quarter);
  validation.checkYear(year);

  // download zip to file system
  /** @type {string} */
  const pathToZip = await extractFromSec.filing(quarter, year);
  /** @type {object} */
  const json = await transform.zipToJson(pathToZip);
  /** @type {Promise.<string>} */
  return load.saveJson(json, pathToZip.replace(/\.zip/, '.json'));
}
