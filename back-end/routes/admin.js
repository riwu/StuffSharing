import conn from './connection';

const express = require('express');
const queries = require('./queries');
const utils = require('./utils');

const router = express.Router();

router.post('/add/stuff', (req, res, next) => {
	// Add new stuff
	if (utils.isAdmin({'username:' req.body.username, 'password': req.body.password}) == false) {
		return res.send(404);
	}
	var stuffInfo = {'name': req.body.name, 'desc': req.body.desc, 'condition': req.body.condition, 'category': category,
					  	'location': req.body.location, 'owner': req.body.owner, 'price': req.body.price,
					  	'available_from': req.body.available_from, 'max_loan_period': req.body.max_loan_period};

	const response = conn.query(queries.addStuff(stuffInfo));
	return response.then(data => res.send(data));
});

router.post('/delete/stuff', (req, res, next) => {
	// Delete this stuff
	if (utils.isAdmin({'username:' req.body.username, 'password': req.body.password}) == false) {
		return res.send(404);
	}
	const response = conn.query(queries.deleteStuff(req.body.stuffId));
	return response.then(data => res.send(data));
});

router.post('/delete/user', (req, res, next) => {
	// Delete this user
	if (utils.isAdmin({'username:' req.body.username, 'password': req.body.password}) == false) {
		return res.send(404);
	}
	const response = conn.query(queries.deleteUser(req.body.username));
	return response.then(data => res.send(data));
});

module.exports = router;