const Cache = require('./../utility/cacheData.js');
const bluebird = require('bluebird');
const CacheParser = require('./../utility/cacheParser.js');
////////////////////////////////////////////////////////////////
const Classes = function(req, res) {
	if (req.decoded.user === 'teacher') {
		bluebird.promisify(Cache.getCache);
		Cache.getCache('teacherData').then(function(cache) {
				CacheParser.getClasses(cache, function(err, resp) {
					if (err) {
						res.status(400).send(err);
					} else {
						console.log('this is resp', resp);
						res.status(200).send(resp);
					}
				});
		});
	} else {
		let error = 'UNAUTHORIZED';
		res.status(403).send(error);
		res.end();
	}
};

////////////////////////////////////////////////////////////////
const StudentsByClass = function(req, res) {
	if (req.decoded.user === 'teacher') {
	 	bluebird.promisify(Cache.getCache);
		Cache.getCache('teacherData').then(function(cache) {
			CacheParser.getStudents(cache, function(err, resp) {
				if (err) {
					res.status(400).send(err);
					res.end();
				} else {
					res.status(200).send(resp);
					res.end();
				}
			});
		});
	} else {
		let error = 'UNAUTHORIZED';
		res.status(403).send(error);
		res.end();
	}
};

////////////////////////////////////////////////////////////////
const TestsForClass = function(req, res) {
	console.log('in tests for class', req.query.classId);
	if (req.decoded.user === 'teacher') {
		let classId = req.query.class_Id;
		bluebird.promisify(Cache.getCache);
		Cache.getCache('teacherData').then(function(cache) {
			CacheParser.getTestsForClass(cache, classId, function(err, resp) {
				if (err) {
					res.status(400).send(err);
					res.end();
				} else {
					console.log('THIS IS THE RESP IN TESTSFORCLASS', resp);
					res.status(200).send(resp);
					res.end();
				}
			});
		});
	} else {
		let error = 'UNAUTHORIZED';
		res.status(403).send(error);
		res.end();
	}
}

////////////////////////////////////////////////////////////////
const KeysForClass = function(req, res) {
	if (req.decoded.user === 'teacher') {
		let classId = req.query.class_Id;
		bluebird.promisify(Cache.getCache);
		Cache.getCache('teacherData').then(function(cache) {
			CacheParser.getKeysForClass(cache, classId, function(err, resp) {
				if (err) {
					res.status(400).send(err);
				} else {
					res.status(200).send(resp);
					res.end();
				}
			})
		})
	}
}
////////////////////////////////////////////////////////////////
module.exports = {
	'Classes': Classes,
  'StudentsByClass': StudentsByClass,
  'TestsForClass': TestsForClass,
  'KeysForClass': KeysForClass
}