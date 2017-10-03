var express = require('express');
var queries = require('queries');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  	const response = createConnection.then(connection => connection.query(queries.allSafeUserData));
	return response.then(data => res.send(data));
});

router.get('/:username', function(req, res, next) {
	const response = createConnection.then(connection => {
		connection.query(queries.getUserData(req.params['username']));
	});
	return response.then(data => res.send(data));
});

module.exports = router;
