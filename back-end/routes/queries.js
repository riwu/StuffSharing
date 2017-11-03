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
function getFilteredStuff(filterList){
	var query = "SELECT * FROM stuff s WHERE ";
	var list = [];
	var order;
	console.log(filterList);
	if(filterList.name) {
		list.push("s.name LIKE \'%" + filterList.name + "%\'");
	}
	if(filterList.category) {
		list.push("s.location LIKE \'%" + filterList.category + "%\'");
	}
	if(filterList.priceLow) {
		list.push("s.price >= " + filterList.priceLow);
	}
	if(filterList.priceHigh) {
		list.push("s.price <= " + filterList.priceHigh);
	}
	if(filterList.conditionLow) {
		list.push("s.condition >=" + filterList.conditionLow);
	}
	if(filterList.conditionHigh) {
		list.push("s.condition <= " + filterList.conditionHigh);
	}
	if(filterList.location) {
		list.push("s.location LIKE \'%" + filterList.location + "%\'");
	}
	if(filterList.availableDate){
		list.push("s.available_from <= " + filterList.availableDate);
	}
	if(filterList.maxLoan){
		list.push("s.max_loan_period >= " + filterList.maxLoan);
	}
	if(filterList.owner){
		list.push("s.owner LIKE \'%" + filterList.owner + "%\'");
	}
	query = query + list.join(" AND ");
	if(filterList.asc) {
		order = "ASC";
	} else {
		order = "DESC";
	}
	query = query + " ORDER BY s." + filterList.sort + " " + order;
	console.log('query: ' + query);
	var startIndex = (page - 1) * count;
	var endIndex = page * count;
	console.log("**");
	var fquery = "SELECT * FROM ( " + query + ") " + " LIMIT " + startIndex + " , " + endIndex;
	console.log('Final query: ' + fquery);
	return fquery;
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
	allSafeUserData: 'SELECT id, username, email, first_name, last_name FROM user',
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

	getFilteredStuff: getFilteredStuff,
};
