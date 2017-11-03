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
	const response = conn.query(queries.getBidsFor(username, stuffId));
	return response.then(data => res.send(data));
});

router.post('/bidSelect', (req, res, next) => {
	var bidWin = {'user': req.body.username, 'stuffId': req.body.stuffId, 'bidAmt': req.body.bidAmt};
	const response = conn.query(queries.setBidWinner(bidWin));
	return response.then((data) => {
		conn.query.borrowStuff(bidWin);
	}).then(data => res.send(data));
});



module.exports = router;