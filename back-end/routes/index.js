var mysql = require('promise-mysql');
var express = require('express');
var router = express.Router();

const createConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'mydb',
});

router.get('/', function(req, res, next) {
  const response = createConnection.then(connection => connection.query('SELECT * FROM table1'))
  return response.then(data => res.send(data));
});

module.exports = router;
