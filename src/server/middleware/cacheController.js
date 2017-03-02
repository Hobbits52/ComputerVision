const fetchCache = function(table) {
	const redisClient = require('./../server.js').redis;
  return redisClient.getAsync('teacherData').then(function(response) {
    var k = JSON.parse(response);
    return k;
  }).catch(function() {
    var error = 'Something went wrong with cache fetching';
    return error;
  })
};

module.exports = {
	'fetchCache': fetchCache
}