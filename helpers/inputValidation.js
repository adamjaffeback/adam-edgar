const acceptableQuarters = new Set([1, 2, 3, 4]);
const years = [];
const thisYear = new Date().getFullYear();

for (let i = 2009; i <= thisYear; i++) {
  years.push(i);
}

const acceptableYears = new Set(years);

function exists (label, input) {
  if (typeof input !== 'number') {
    throw new TypeError(`${label} parameter must be supplied as a number.`);
  }

  return true;
}

exports.checkQuarter = quarterInput => {
  exists('Quarter', quarterInput);

  if (!acceptableQuarters.has(quarterInput)) {
    throw new RangeError('Quarter parameter is 1-indexed and must be 1, 2, 3, or 4.');
  }

  return true;
}

exports.checkYear = yearInput => {
  exists('Year', yearInput);

  if (!acceptableYears.has(yearInput)) {
    throw new RangeError('Year parameter is any year between 2009 and this year.');
  }

  return true;
}
