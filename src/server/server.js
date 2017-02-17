const app = require('./server-config.js');
const port = process.env.PORT || 8080;

const server = app.listen(port);


console.log('Server now listening on port ' + port);

module.exports = server;