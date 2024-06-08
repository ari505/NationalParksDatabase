// ./database/db-connector.js

// Citation for all code:
// Date: 06/07/24
// Adapted from: Sample code privided in class
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_valenari', //cs340_mcintyvi OR cs340_valenari
    password        : '0830', //4387 OR 0830
    database        : 'cs340_valenari'
})

// Export it for use in our applicaiton
module.exports.pool = pool;