var mysql = require("mysql");

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORT,
  database: process.env.DB_DATABASE,
  insecureAuth : process.env.DB_SECUREAUTH
});

connection.connect(err => {
  if (err) {
    throw err;
  }
});

module.exports = connection;
