const mysql = require('mysql');

/*
https://remotemysql.com/phpmyadmin/index.php?db=MCWKiOrWYL
*/

/*
It is likely best to use createPool instead of createConnection for the connection.
*/
const connection = mysql.createPool({
  host: 'remotemysql.com',
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'MCWKiOrWYL'
});

module.exports = connection;