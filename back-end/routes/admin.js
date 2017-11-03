import conn from './connection';

const express = require('express');
const queries = require('./queries');

const router = express.Router();

router.post('/add/stuff', (req, res, next) => {
	// Add new stuff
	var stuffInfo = {'name': req.body.name, 'desc': req.body.desc, 'condition': req.body.condition, 'category': category,
					  	'location': req.body.location, 'owner': req.body.owner, 'price': req.body.price,
					  	'available_from': req.body.available_from, 'max_loan_period': req.body.max_loan_period};

	const response = conn.query(queries.addStuff(stuffInfo));
	return response.then(data => res.send(data));
});

router.post('/delete/stuff', (req, res, next) => {
	// Delete this stuff
	const response = conn.query(queries.deleteStuff(req.body.stuffId));
	return response.then(data => res.send(data));
});

router.post('/delete/user', (req, res, next) => {
	// Delete this user
	const response = conn.query(queries.deleteUser(req.body.username));
	return response.then(data => res.send(data));
});

module.exports = router;