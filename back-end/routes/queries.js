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

function getAllMyBids(username) {
	return 'SELECT * from bid_log AS b, stuff AS s, user AS u ' + 
				'WHERE b.stuff_id=s.id AND s.owner AND u.id == s.owner AND u.username=' + username;
}

function getBidsFor(username, stuffId) {
	return getAllMyBids(username) + ' s.id=' + stuffId;
}

function bidForStuff(stuffId, params) {
	var keyValues = getCommaSeparatedKeysValues(params);
	return 'INSERT INTO bid_log ('+ keyValues[0] + ') VALUES (' + keyValues[1] + ') WHERE id='+stuffId;
}

function setBidWinner(bidDetails) {
	
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
		list.push("s.available_from <= \"" + filterList.availableDate + "\"");
	}
	if(filterList.maxLoan){
		list.push("s.max_loan_period >= " + filterList.maxLoan);
	}
	if(filterList.owner){
		list.push("s.owner LIKE \'%" + filterList.owner + "%\'");
	}
	query = query + list.join(" AND ");
	var order = "DESC";
	if(filterList.asc) {
		order = "ASC";
	}
	query = query + " ORDER BY s." + filterList.sort + " " + order;
	console.log('query: ' + query);
	const startIndex = (filterList.page - 1) * filterList.count;
	const endIndex = filterList.page * filterList.count;
	console.log("**");
	var query = query + " LIMIT " + startIndex + ", " + endIndex;
	console.log('Final query: ' + query);
	return query;
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


function loginUser(details) {
	return "SELECT * FROM user u WHERE u.username LIKE \'%" + details.username + "%\'" + " AND u.password = " + details.password;
}

function checkUsername(username) {
	return "SELECT * FROM user u WHERE u.username LIKE \'%" + username + "%\'";
}

function registerUser(details) {
	return "INSERT INTO user(username, password, email, first_name, last_name, isAdmin) VALUES (" + "\'" + details.username + "\'" + ", " + "\'" + details.password + "\'" + ", " + "\'" + details.email + "\'" + ", " + "\'" + details.first_name + "\'" + ", " + "\'" + details.last_name + "\'" + "\'" + "false" + "\'" + ")";
}

module.exports = {
	allSafeUserData: 'SELECT id, username, email, first_name, last_name FROM user',
	allUserData: 'SELECT * FROM user',
	allStuffData: 'SELECT * FROM stuff AS s, user AS u WHERE s.owner=u.id',
	allBidData: 'SELECT * FROM bid_log ORDER BY bid_amt DESC',
	allLoanData: 'SELECT * FROM loan_log ORDER BY loan_date',

	getUserData: getUserData,
	getStuffData: getStuffData,

	updateUserDetails: updateUserDetails,
	updateStuffDetails: updateStuffDetails,

	deleteUser: deleteUser,
	deleteStuffData: deleteStuffData,

	getAllMyBids: getAllMyBids,
	getBidsFor: getBidsFor,
	bidForStuff: bidForStuff,
	setBidWinner: setBidWinner,
	addLoanLog: addLoanLog,

	getFilteredStuff: getFilteredStuff,

	loginUser: loginUser,
	checkUsername: checkUsername,
	registerUser: registerUser,
};
