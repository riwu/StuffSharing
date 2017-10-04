var express = require('express');
var queries = require('./queries');
var router = express.Router();

let connection;
mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'mydb',
}).then(conn => { connection = conn });

/* GET users listing. */
router.get('/', function(req, res, next) {
  	const response = connection.query(queries.allSafeUserData);
	return response.then(data => res.send(data));
});

router.get('/:username', function(req, res, next) {
	const response = connection.query(queries.getUserData(req.params['username']));
	return response.then(data => res.send(data));
});

module.exports = router;
