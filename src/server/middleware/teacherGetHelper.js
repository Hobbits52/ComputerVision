const CacheController = require('./cacheController.js');
const bluebird = require('bluebird');
const CacheParser = require('./../utility/cacheParser.js');
////////////////////////////////////////////////////////////////
const Classes = function(req, res) {
	bluebird.promisify(CacheController.fetchCache);
	CacheController.fetchCache('teacherData').then(function(response) {
			CacheParser.getClasses(response, function(err, resp) {
				if (err) {
					res.status(400).send(err);
				} else {
					res.status(200).send(resp);
				}
			});
	});
}

////////////////////////////////////////////////////////////////
const StudentsforClass = function(req, res) {
 	bluebird.promisify(CacheController.fetchCache);
	CacheController.fetchCache('teacherData').then(function(response) {
			CacheParser.getStudents(response, function(err, resp) {
				if (err) {
					res.status(400).send(err);
					res.end();
				} else {
					res.status(200).send(resp);
					res.end();
				}
			});
	});
}

////////////////////////////////////////////////////////////////
module.exports = {
	'Classes': Classes,
  'StudentsforClass': StudentsforClass
}