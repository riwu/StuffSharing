function getUserData(username) {
	return 'SELECT * FROM stuff WHERE owner=' + username;
}

function updateUserDetails(username, params) {
	return 'UPDATE user SET' + paramsToString(params) + ' WHERE username='+ username;
}

function deleteUser(username) {
	return 'DELETE FROM user WHERE username=' + username;
}

function getStuffData(stuffId) {
	return 'SELECT * FROM stuff WHERE id=' + stuffId;
}

function updateStuffDetails(stuffId, params) {
	return 'UPDATE stuff SET' + paramsToString(params) + ' WHERE id='+ stuffId;
}

function deleteStuffData(stuffId) {
	return 'DELETE FROM stuff WHERE id=' + stuffId;
}

function bidForStuff(stuffId, params) {
	var keyValues = getCommaSeparatedKeysValues(params);
	return 'INSERT INTO bid_log ('+ keyValues[0] + ') VALUES (' + keyValues[1] + ') WHERE id='+stuffId;
}

function addLoanLog(params) {
	var keyValues = getCommaSeparatedKeysValues(params);
	return 'INSERT INTO loan_log ('+ keyValues[0] + ') VALUES (' + keyValues[1] + ')';
}

function paramsToString(params) {
	var query = '';
	for(var key in params) {
		query += ' ' + key + '=' + params[key] + ',';
	}
	return query.slice(0, -1);
}

function getCommaSeparatedKeysValues(params) {
	var keys = [], values = [];
	for(var key in params) {
		keys.push(key);
		values.push(params[key]);
	}
	return [keys.join(), values.join()];
}

module.exports = {
	allSafeUserData: 'SELECT first_name, last_name, email, location FROM user ORDER BY name',
	allUserData: 'SELECT * FROM user',
	allStuffData: 'SELECT * FROM stuff',
	allBidData: 'SELECT * FROM bid_log ORDER BY bid_amt DESC',
	allLoanData: 'SELECT * FROM loan_log ORDER BY loan_date',

	getUserData: getUserData,
	getStuffData: getStuffData,

	updateUserDetails: updateUserDetails,
	updateStuffDetails: updateStuffDetails,

	deleteUser: deleteUser,
	deleteStuffData: deleteStuffData,

	bidForStuff: bidForStuff,
	addLoanLog: addLoanLog,
};