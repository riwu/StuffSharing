import conn from './connection';

const express = require('express');
const queries = require('./queries');

const router = express.Router();

router.get('/', (req, res, next) => {
	// List of all available things
  const response = conn.query(queries.allStuffData);
  return response.then(data => res.send(data));
});

router.get('/:stuffid', (req, res, next) => {
	// Detail view for stuff with stuff id
  const response = conn.query(queries.getStuffData(req.params.stuffId));
  return response.then(data => res.send(data));
});

// router.get('/stuff/:stuffid/bid', function(req, res, next) {
// 	// Bid for this stuff
// });

// router.get('/admin', function(req, res, next) {
// 	// Admin privileges to create, update and delete all entries
// });

module.exports = router;
