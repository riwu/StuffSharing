import conn from './connection';

const express = require('express');
const bid = require('./queries/bid')
const queries = require('./queries/stuff');
const utils = require('./utils');

const router = express.Router();

router.all('*', (req, res, next) => {
	if (utils.isValidUser({username: req.body.username, password: req.body.password}) == false) {
		return res.send(404);
	}
	next();
});

router.param('stuffid', (req, res, next, stuffid) => {
	req.stuffid = null;
	if (stuffid.length > 0) {
		req.stuffid = stuffid;
	}
	next();
});

router.get('/:stuffid', (req, res, next) => {
	// Detail view for stuff with stuff id
	const response = conn.query(queries.getStuffData(req.stuffid));
	return response.then(data => res.send(data));
});

router.post('/:stuffId/bid', function(req, res, next) {
	// Bid for this stuff
	var bidInfo = {'user': req.body.user, 'bidAmt': req.body.bidAmt, 'stuffId': req.body.stuffId};
	const response = conn.query(bid.bidForStuff(bidInfo));
	return response.then(data => res.send(data));
});

router.get('/', (req, res, next) => {
	// List of all available things
	if (req.query) {
		return filterStuff(req.query, res);
	} else {
		const response = conn.query(queries.allStuffData);
		return response.then(data => res.send({data, pages:1}));
	}
});

function filterStuff(queryList, res) {
	queryList = utils.cleanQueryList(queryList);
	const response = conn.query(queries.getFilteredStuff(queryList));
	return response.then(data => res.send({data, pages: 1 + parseInt(data.length/queryList.count)}));
}

module.exports = router;
