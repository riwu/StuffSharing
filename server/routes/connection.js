const mysql = require('promise-mysql');

let conn;
mysql
  .createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: 'stuff_sharing',
    port: process.env.MYSQL_PORT,
    password: process.env.MYSQL_PASSWORD,
  })
  .then((connection) => {
    console.log('setting connection');
    conn = connection;
  });

export { conn as default };
