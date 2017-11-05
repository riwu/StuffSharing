import conn from './connection';

const express = require('express');
const analytics = require('./userAnalytics')
const queries = require('./queries/users.js');
const stuff = require('./queries/stuff.js');

const router = express.Router();

router.all('*', (req, res, next) => {
	// if (utils.isValidUser({username: req.body.username, password: req.body.password}) == false) {
	// 	return res.send(404);
	// }
	next();
});

router.param('username', (req, res, next, username) => {
	req.username = null;
	if (username.length > 0) {
		req.username = username;
	}
	next();
});


router.post('/add/stuff', (req, res, next) => {
	// Add new stuff
	if (utils.isValidUser({username: req.body.user.username, password: req.body.user.password}) == false) {
		return res.send(404);
	}
	var stuffInfo = {'name': req.body.name, 'desc': req.body.desc, 'condition': req.body.condition, 'category': category,
					  	'location': req.body.location, 'owner': req.body.user.username, 'price': req.body.price,
					  	'available_from': req.body.available_from, 'max_loan_period': req.body.max_loan_period};
	const response = conn.query(stuff.addStuff(stuffInfo));
	return response.then(data => res.send(data));
});

router.post('/stuff/delete', (req, res, next) => {
	// Delete this stuff
	if (utils.isValidUser({username: req.body.user.username, password: req.body.user.password}) == false) {
		return res.send(404);
	}
	console.log("Ddelete Stuff");
	const response = conn.query(stuff.deleteStuff(req.body.stuffId));
	return response.then(data => res.send(data));
});

router.post('/stuff/:stuffId/update', (req, res, next) => {
	// Update this stuff
	if (utils.isValidUser({username: req.body.user.username, password: req.body.user.password}) == false) {
		return res.send(404);
	}
	var stuffInfo = {'name': req.body.name, 'desc': req.body.desc, 'condition': req.body.condition, 'category': category,
					  	'location': req.body.location, 'owner': req.body.user.username, 'price': req.body.price,
					  	'available_from': req.body.available_from, 'max_loan_period': req.body.max_loan_period};
	const response = conn.query(update.updateStuff(stuffId, stuffInfo));
	return response.then(data => res.send(data));
})

router.get('/:username', (req, res, next) => {
	console.log(req.username);
	var list = getUserInfo(req.username, req.body.months);
	return Promise.all(list).then(values => {
		console.log('All User Info loaded');
		res.send(arrangeValues(values));
	});
});

/* GET users listing. */
router.get('/', (req, res, next) => {
  const response = conn.query(queries.allSafeUserData());
  return response.then(data => res.send(data));
});

function getUserInfo(username, months) {
	months = (months)? months : 6;
	var qs = [ 	
					analytics.stuffBorrowed(username), 
					analytics.stuffLent(username),
					analytics.totalEarned(username),
					analytics.monthlyEarned(username),
					analytics.totalSpent(username),
					analytics.monthlySpent(username),
					analytics.mostPopularStuff(username),
					analytics.favouriteCategory(username),
					queries.getUserData(username),
					queries.getUserStuff(username)
				];
	var promiseList = [];
	for(var query in qs) {
		promiseList.push(conn.query(qs[query]));
	}
	return promiseList;
}

function arrangeValues(listValues) {
	return {stuffBorrowed: listValues[0], stuffLent: listValues[1],
			totalEarning: listValues[2], monthlyEarning: 20,
			totalSpent: listValues[4], monthlySpent: 20,
			mostPopular: listValues[6] , favoriteCategory: listValues[7],
			userData: listValues[8], userStuff: listValues[9],
			};
}

module.exports = router;
