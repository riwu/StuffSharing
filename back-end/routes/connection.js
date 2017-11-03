const mysql = require('promise-mysql');

console.log(process.env.STUFF_PASSWORD);
let conn;
mysql.createConnection({
  host: 'mydbinstance.cbmbiclknx5e.ap-southeast-1.rds.amazonaws.com',
  user: 'stuff_sharing',
  database: 'stuff_sharing',
  port: 1150,
  password: process.env.STUFF_PASSWORD,
}).then((connection) => {
  console.log('setting connection');
  conn = connection;
});

export { conn as default };
