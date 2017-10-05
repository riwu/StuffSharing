import connection from './connection';
var express = require('express');
var queries = require('./queries');
var router = express.Router();

router.get('/stuff', function(req, res, next) {
	// List of all available things
	const response = connection.query(queries.allStuffData);
	return response.then(data => res.send(data));
});

router.get('/stuff/:stuffid', function(req, res, next) {
	// Detail view for stuff with stuff id
	const response = connection.query(queries.getStuffData(req.params['stuffId']));
	return response.then(data => res.send(data));
});

// router.get('/stuff/:stuffid/bid', function(req, res, next) {
// 	// Bid for this stuff
// });

// router.get('/admin', function(req, res, next) {
// 	// Admin privileges to create, update and delete all entries
// });

module.exports = router;
