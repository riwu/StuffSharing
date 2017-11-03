import conn from './connection';

const express = require('express');
const queries = require('./queries');

const router = express.Router();

router.get('/:username', (req, res, next) => {
	// Get all the bids on my products
	const response = conn.query(queries.getAllMyBids(username));
	return response.then(data => res.send(data));
});

router.get('/:username/:stuffId', (req, res, next) => {
	const response = conn.query(queries.allSafeUserData);
	return response.then(data => res.send(data));
});

module.exports = router;