const app = require('./server-config.js');
const port = process.env.PORT || 8000;
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'computervision'
});

connection.connect();

const server = app.listen(port);

console.log('Server now listening on port ' + port);

module.exports = server;