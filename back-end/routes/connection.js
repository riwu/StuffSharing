const mysql = require('promise-mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123qwe',
  database: 'mydb',
});

export default connection;
