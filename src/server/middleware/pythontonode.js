const Image = require('./imageFetch.js');
const spawn = require('child_process').spawn;
const Test = require('./../../../db/test/testController.js');
const Answerkey = require('./../../../db/key/keyController.js');
const py = spawn('python', ['./../utility/scanner.py']);

const Scanner = function(uploadFile, type, cb) {
	let url = uploadFile.url;
	let TeachersId = uploadFile.TeachersId;
	let ClassesId = uploadFile.ClassesId;

	let dataString = '';

	py.stdout.on('data', function(data) {
	  dataString += data.toString();
	});

	py.stdout.on('end', function() {
	  let data = JSON.parse(dataString);
	  data.answers = JSON.stringify(data.answers);
	  data.teacherId = TeachersId;
	  data.classId = ClassesId;
	  if (type === 'key') {
	  	Answerkey.addKey(data, function(err, data) {
	  	  if (err) {
	  	  	cb(err);
	  	  } else {
	  	  	cb(null, data);
	  	  }
	  	});
	  } else {
	  	Test.addTest(data, function(err, data) {
	  	  if (err) {
	  	  	cb(err);
	  	  } else {
	  	  	console.log(data);
	  	  }
	  	});
	  }
	});

	py.stdin.write(JSON.stringify(imgUrl));
	py.stdin.end();
};

module.exports = {
	'Scanner': Scanner
}