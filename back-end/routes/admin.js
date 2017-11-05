import conn from './connection';

const express = require('express');
// const analytics = require('./analyticQueries');
const stuff = require('./queries/stuff');
const users = require('./queries/users');
const utils = require('./utils');

const router = express.Router();

router.all('*', (req, res, next) => {
	if (utils.isAdmin({username: req.body.username, password: req.body.password}) == false) {
		return res.send(404);
	}
	next();
});

router.post('/add/stuff', (req, res, next) => {
	// Add new stuff
	var stuffInfo = {'name': req.body.name, 'desc': req.body.desc, 'condition': req.body.condition, 'category': category,
					  	'location': req.body.location, 'owner': req.body.user.username, 'price': req.body.price,
					  	'available_from': req.body.available_from, 'max_loan_period': req.body.max_loan_period};

	const response = conn.query(stuff.addStuff(stuffInfo));
	return response.then(data => res.send(data));
});

router.post('/delete/stuff', (req, res, next) => {
	// Delete this stuff
	const response = conn.query(stuff.deleteStuff(req.body.stuffId));
	return response.then(data => res.send(data));
});

router.post('/delete/user', (req, res, next) => {
	// Delete this user
	const response = conn.query(users.deleteUser(req.body.username));
	return response.then(data => res.send(data));
});

// Analytics
router.get('/analytics', (req, res, next) => {
})

module.exports = router;