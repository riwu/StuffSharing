var mysql = require('promise-mysql');

let connection;
mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'mydb',
}).then(conn => { connection = conn });

export default connection;
