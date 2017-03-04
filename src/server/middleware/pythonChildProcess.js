const Test = require('./../../../db/test/testController.js');
const Answerkey = require('./../../../db/key/keyController.js');
const spawn = require('child_process').spawn;
const path = require('path');

const Scanner = function(uploadFile, type, cb) {
	const py = spawn('python', [path.join(__dirname + '/../utility/scanner.py')]);
	let url = uploadFile.url;
	let dataString = '';

	py.stdin.write(JSON.stringify(url));
	py.stdin.end();

	py.stderr.on('data', function(data) {
		console.log('stderr: ' + data);
	});

	py.on('close', function(code) {
		console.log('Child process exited with code ' + code);
	});

	py.stdout.on('data', function(data) {
	  dataString += data.toString();
	});

	py.stdout.on('end', function() {
	  let data = JSON.parse(dataString);
	  if (data.status === 400) {
	  	cb(data.message);
	  } else {
		  data.answers = JSON.stringify(data.answers);
		  data.TeacherId = uploadFile.TeacherId;
		  data.ClassId = uploadFile.ClassId;
		  if (type === 'key') {
		  	Answerkey.addKey(data, function(err, data) {
		  	  if (err) {
		  	  	cb(err);
		  	  } else {
		  	  	cb(null, data);
		  	  }
		  	});
		  } else {
		  	data.answerkeyId = 1;
		  	data.StudentId = 1;
		  	Test.addTest(data, function(err, data) {
		  	  if (err) {
		  	  	cb(err);
		  	  } else {
		  	  	cb(null, data);
		  	  }
		  	});
		  }
		}
	});
};

module.exports = {
	'Scanner': Scanner
}