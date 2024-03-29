// Set up MySQL connection.
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: "CAM@wa123",
    database: 'burgers_db',
});

//uses jawsdb as primary connection if opened through heroku
if (process.env.JAWSDB_URL) {   
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    //primary connection to database if jawsdb unable to connect
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: "CAM@wa123",
        database: 'burgers_db'
    })
}

// Make connection.
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;