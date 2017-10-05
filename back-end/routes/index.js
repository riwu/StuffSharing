var express = require('express');
var queries = require('./queries');
var router = express.Router();
import connection from './connection';


router.get('/', function(req, res, next) {
	// view homepage
	return res.send('Welcome to Stuff Sharing');
  // const response = createConnection.then(connection => connection.query('SELECT * FROM table1'))
  // return response.then(data => res.send(data));
});

// router.get('/me', function(req, res, next) {
// 	// view my details
// });

// router.get('/me/update', function(req, res, next) {
// 	// update my name password or email
// 	// cannot change username
// });

// router.get('/mystuff', function(req, res, next) {
// 	// See list of all stuff owned by me
// });

// router.get('/mystuff/add', function(req, res, next) {
// 	// Add new stuff owned by me
// });

// router.get('/mystuff/:stuffid/update', function(req, res, next) {
// 	// update any details for this stuff
// 	// Select winning bid
// });

// router.get('/mystuff/:stuffid/delete', function(req, res, next) {
//  // delete this listing
// });



router.get('/bids', function(req, res, next) {
	const response = connection.then(conn => conn.query(queries.allBidData));
	return response.then(data => res.send(data));
});

router.get('/loans', function(req, res, next) {
	const response = connection.then(conn => conn.query(queries.allLoanData));
	return response.then(data => res.send(data));
});

module.exports = router;
