const validation = require('./inputValidation');
const fetch = require('./fetch');

module.exports = async function (quarter, year) {
  validation.checkQuarter(quarter);
  validation.checkYear(year);

  await fetch.getFiling(quarter, year);
}
