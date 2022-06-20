
// Import Modules
const mysql = require('mysql2');

// Enable access to .env variables
require('dotenv').config();

const db = mysql.createConnection({
    host: "localhost",
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 3306,
});

module.exports = db;

