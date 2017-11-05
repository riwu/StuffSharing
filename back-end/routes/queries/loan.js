function getAllLoanData() {
	return `SELECT * FROM loan_log ORDER BY loan_date`;
}

function addLoanLog(params) {
  const keyValues = getCommaSeparatedKeysValues(params);
  return `INSERT INTO loan_log (${keyValues[0]}) VALUES (${keyValues[1]})`;
}

function getCommaSeparatedKeysValues(params) {
  let keys = [],
    values = [];
  for (const key in params) {
    keys.push(key);
    values.push(params[key]);
  }
  return [keys.join(), values.join()];
}

module.exports = {
	getAllLoanData,
	addLoanLog,
};