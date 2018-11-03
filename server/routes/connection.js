const mysql = require('promise-mysql');

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  database: 'stuff_sharing',
  port: process.env.MYSQL_PORT,
  password: process.env.MYSQL_PASSWORD
});

export default connection;
