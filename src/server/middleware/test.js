const cache = require('./../utility/cacheData.js');

cache.getCache(2).then(function(data) {
	console.log(null === data);
}).catch(function(err) {
	console.log(err);
})