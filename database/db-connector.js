// ./database/db-connector.js

// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_mcintyvi', //cs340_mcintyvi OR cs340_valenari
    password        : '4387', //4387 OR 0830
    database        : 'cs340_mcintyvi'
})

// Export it for use in our applicaiton
module.exports.pool = pool;