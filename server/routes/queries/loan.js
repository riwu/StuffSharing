function getAllLoanData() {
	return `SELECT * FROM loan_log ORDER BY loan_date`;
}

function addLoanLog(params) {
  const keyValues = getCommaSeparatedKeysValues(params);
  return `INSERT INTO loan_log (${keyValues[0]}) VALUES (${keyValues[1]})`;
}

function returnStuff(params) {
  return `UPDATE loan_log SET return_date="${getTodayDate()}" WHERE stuff=${params.stuffId} AND ` +
            `return_date = null`;
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

function getTodayDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();             

  dd = (dd<10)? '0'+dd : dd;
  mm = (mm<10)? '0'+mm : mm;
  return yyyy + '-' + mm + '-' + dd;
}

module.exports = {
	getAllLoanData,
	addLoanLog,
};