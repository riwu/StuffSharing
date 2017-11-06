import conn from './connection';

const express = require('express');
const bid = require('./queries/bid');
const queries = require('./queries/stuff');
const utils = require('./utils');

const router = express.Router();

router.param('stuffId', (req, res, next, stuffId) => {
  req.stuffId = null;
  if (stuffId.length > 0) {
    req.stuffId = stuffId;
  }
  console.log("StuffId: ", stuffId, req.stuffId);
  next();
});

router.post('/:stuffId/bid/delete', (req, res, next) => {
	const bidInfo = {stuffId: req.stuffId,  user: req.body.user, timestamp: req.body.timestamp};
});

router.post('/:stuffId/bid', (req, res, next) => {
	// Bid for this stuff
	console.log(req.stuffId);
	console.log(req.body);
	const bidInfo = { user: req.body.user.username, bidAmt: req.body.bidAmt, stuffId: req.stuffId };
	const response = conn.query(bid.bidForStuff(bidInfo));
	return response.then(data => res.send(data));
});

router.get('/:stuffId', (req, res, next) => {
	// Detail view for stuff with stuff id
  const response = conn.query(queries.getStuffData(req.stuffId));
  return response.then(data => res.send(data));
});

router.post('/delete', (req, res, next) => {
  if (utils.isValidUser(req.body.user) == false) {
    return res.status(404).end();
  }
  console.log('Delete Stuff');
  const response = conn.query(queries.deleteStuff(req.body.stuffId));
  return response.then(data => res.send(data));
});

router.get('/', (req, res, next) => {
	// List of all available things
  if (req.query) {
    return filterStuff(req.query, res);
  }
  const response = conn.query(queries.allStuffData);
  return response.then(data => res.send({ data, pages: 1 }));
});

function filterStuff(queryList, res) {
  queryList = utils.cleanQueryList(queryList);
  const response = conn.query(queries.getFilteredStuff(queryList));
  return response.then(data => res.send({ data, pages: 1 + parseInt(data.length / queryList.count) }));
}

module.exports = router;
