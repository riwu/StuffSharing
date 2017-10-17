const mysql = require('promise-mysql');

const connection = mysql.createConnection({
  host: 'mydbinstance.cbmbiclknx5e.ap-southeast-1.rds.amazonaws.com',
  user: 'stuff_sharing',
  database: 'stuff_sharing',
  port: 1150,
  password: process.env.STUFF_PASSWORD,
});

export default connection;
