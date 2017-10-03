var mysql = require('promise-mysql');
var express = require('express');
var queries = require('./queries.js');
var router = express.Router();

const createConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'mydb',
});

router.get('/', function(req, res, next) {
	// view homepage
  // const response = createConnection.then(connection => connection.query('SELECT * FROM table1'))
  // return response.then(data => res.send(data));
});

router.get('/me', function(req, res, next) {
	// view my details
});

router.get('/me/update', function(req, res, next) {
	// update my name password or email
	// cannot change username
});

router.get('/mystuff', function(req, res, next) {
	// See list of all stuff owned by me
});

router.get('/mystuff/add', function(req, res, next) {
	// Add new stuff owned by me
});

router.get('/mystuff/:stuffid/update', function(req, res, next) {
	// update any details for this stuff
	// Select winning bid
});

router.get('/mystuff/:stuffid/delete', function(req, res, next) {
 // delete this listing
});

router.get('/stuff', function(req, res, next) {
	// List of all available things
	const response = createConnection.then(connection => connection.query(queries.allStuffData));
	return response.then(data => res.send(data));
});

router.get('/stuff/:stuffid', function(req, res, next) {
	// Detail view for stuff with stuff id
	const response = createConnection.then(connection => {
		connection.query(queries.getStuffData(req.params['stuffId']));
	});
	return response.then(data => res.send(data));
});

router.get('/stuff/:stuffid/bid', function(req, res, next) {
	// Bid for this stuff
});

router.get('/admin', function(req, res, next) {
	// Admin privileges to create, update and delete all entries
});


module.exports = router;
