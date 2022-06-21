
// Import Modules
const mysql = require('mysql2');

const util = require("util");

// Enable access to .env variables
require('dotenv').config();
// console.log(process.env.DB_NAME)
const db = mysql.createConnection({
    host: "localhost",
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 3306,
});

db.query = util.promisify(db.query);
module.exports = db;

// module.exports = db;

// const mysql = require("mysql2");
// const util = require("util");

// const db = mysql.createConnection({
//   user: "root",
//   password: "woot",
//   host: "localhost",
//   database: "employees",
// });


// module.exports = db;
