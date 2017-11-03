import conn from './connection';

const express = require('express');
const queries = require('./queries');
const utils = require('./utils');

const router = express.Router();

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
	const response = conn.query(queries.bidForStuff(bidInfo));
	return response.then(data => res.send(data));
});

router.get('/', (req, res, next) => {
	// List of all available things
	if (req.query) {
		return filterStuff(req.query, res);
	} else {
		const response = conn.query(queries.allStuffData);
		return response.then(data => res.send(data));		
	}
});

function filterStuff(queryList, res) {
	console.log('in filter');
	queryList = utils.cleanQueryList(queryList);
	const response = conn.query(queries.getFilteredStuff(queryList));
	return response.then(data => res.send(data));
}

module.exports = router;
