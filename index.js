const validation = require('./inputValidation');

module.exports = function (quarter, year) {
  validation.checkQuarter(quarter);
  validation.checkYear(year);
}
