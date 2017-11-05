import conn from './connection';

const express = require('express');
const bid = require('./queries/bid');
const loan = require('./queries/loan');
const stuff = require('./queries/stuff');
const users = require('./queries/users');


const router = express.Router();

router.get('/', (req, res, next) => {
	// Get all the bids on my products
	const response = conn.query(bid.getAllMyBids(username));
	return response.then(data => res.send(data));
});

router.get('/:username/:stuffId', (req, res, next) => {
	const response = conn.query(bid.getBidsFor(username, stuffId));
	return response.then(data => res.send(data));
});

router.post('/bidSelect', (req, res, next) => {
	var bidWin = {'bidder': req.body.username, 'stuffId': req.body.stuffId,
					'bidAmt': req.body.bidAmt, 'loanDate': req.body.loanDate};
	const response = conn.query(bid.setBidWinner(bidWin));
	return response.then((data) => {
		conn.loan(addLoanLog(bidWin));
	}).then(data => res.send(data));
});

router.get('/update', (req, res, next) => {

});

module.exports = router;