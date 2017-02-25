const Scanner = require('./pythontonode.js').Scanner;

let uploadFile = {};
uploadFile.url = 'http://res.cloudinary.com/dn4vqx2gu/image/upload/v1487821845/answerkey/testkey.jpg';
uploadFile.ClassesId = 1;
uploadFile.TeachersId = 1;

var test = function(uploadFile, key, cb) {
	Scanner(uploadFile, 'key', function(err, data) {
		if(err) {
			cb(err);
		} else {
			cb(null, data);
		}
	});
};

module.exports = {test: test};