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
	const pages = conn.query(queries.getPages);
	return pages.then(pageData => {
		const numPages = pageData[0]["COUNT(*)"];
		console.log("Pages: " + numPages);
		if (req.query) {
			return filterStuff(req.query, res, numPages);
		} else {
			const response = conn.query(queries.allStuffData);
			return response.then(data => res.send({data, pages:numPages}));
		}
	});
});

function filterStuff(queryList, res, numPages) {
	queryList = utils.cleanQueryList(queryList);
	const response = conn.query(queries.getFilteredStuff(queryList));
	return response.then(data => res.send({data, pages: (1.0*numPages)/queryList.count}));
}

module.exports = router;
