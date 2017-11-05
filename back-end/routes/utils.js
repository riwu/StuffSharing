import conn from './connection';

const stuff = require('./queries/stuff')
const users = require('./queries/users');

function cleanQueryList(queries) {
	const defaultValues = {'name': undefined, 'count': 20, 'page': 1, 'sort': 'name',
						'asc': true, 'availableDate': undefined, 'maxLoan': undefined,
						'category': undefined, 'priceHigh': undefined, 'priceLow': 0,
						'conditionLow': 0, 'conditionHigh': 5, 'owner': undefined, 
						'location': undefined};
	
	for(var key in defaultValues) {
		if(!queries.hasOwnProperty(key) || queries[key]==null || queries[key]==undefined) {
			queries[key] = defaultValues[key];
		}
	}
	return queries;
}

function isValidUser(details) {
	try {
		console.log("%%" +  JSON.stringify(details));
		console.log(users.checkUser(details));
		const response = conn.query(users.checkUser(details));
		response.then(data => {
			console.log('Test: ', data);
			return (data && data.length > 0);
		});
	} catch(err) {
		console.log('CATCH');
		return false;
	}
}

function isAdmin(details) {
	try {
		const response = conn.query(users.checkUser(details));
		return response.then(data => data && data.length > 0 && data.isAdmin);
	} catch (err) {
		return false;
	}
}

module.exports = {
	cleanQueryList,
	isValidUser,
	isAdmin,
};