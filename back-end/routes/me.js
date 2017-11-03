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
	var bidWin = {'bidder': req.body.username, 'stuffId': req.body.stuffId,
					'bidAmt': req.body.bidAmt, 'loanDate': req.body.loanDate};
	const response = conn.query(queries.setBidWinner(bidWin));
	return response.then((data) => {
		conn.query.addLoanLog(bidWin);
	}).then(data => res.send(data));
});

router.get('/:username/:stuffId/update', (req, res, next) => {
	const response = conn.query(queries.getStuffData(req.stuffid));
	response.then(data => {
		console.log(data.owner);
		res.send(data);
	})
});

module.exports = router;