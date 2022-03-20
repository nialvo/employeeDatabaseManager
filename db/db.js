const mysql = require('mysql2');
require('dotenv').config();


const pw = process.env.DB_PASSWORD;
const userID = process.env.DB_USER;
const dbn = process.env.DB_NAME;


const db = mysql.createConnection(
    {
      host: 'localhost',
      user: userID,
      password: pw,
      database: dbn
    },
    console.log(`Connected to the ${dbn} database.`)
);

module.exports = db;