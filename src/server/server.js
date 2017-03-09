const app = require('./server-config.js');
const port = process.env.PORT || 8080;
const bluebird = require('bluebird');

let redisCl = require('redis').createClient(process.env.REDIS_URL);

bluebird.promisifyAll(redisCl);
const server = app.listen(port);

console.log('Server now listening on port ' + port);

module.exports = {'server': server,
									'redis': redisCl}