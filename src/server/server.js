const app = require('./server-config.js');
const port = process.env.PORT || 8080;
// const mysql = require('mysql');

// const connectionInfo = process.env.DATABASE_URL || {
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'computervision'
// }

// const connection = mysql.createConnection(connectionInfo);

// connection.connect();

const server = app.listen(port);


console.log('Server now listening on port ' + port);

module.exports = server;