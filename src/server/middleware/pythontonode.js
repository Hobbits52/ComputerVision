const Image = require('./imageFetch.js');
const spawn = require('child_process').spawn;
const Test = require('./../../../db/test/testController.js');
const Answerkey = require('./../../../db/key/keyController.js');
const py = spawn('python', ['./../utility/scanner.py']);

//////TESTING DATA
var imgName = 'studenttest';
var type = 'test';
///////////////////////

const Scanner = function(url, type) {
	let dataString = '';

	py.stdout.on('data', function(data) {
	  dataString += data.toString();
	});

	py.stdout.on('end', function() {
	  let data = JSON.parse(dataString);
	  data.answers = JSON.stringify(data.answers);
	  if (type === 'key') {
	  	Answerkey.addKey(data, function(err, data) {
	  	  if (err) {
	  	  	console.log(err);
	  	  } else {
	  	  	console.log(data);
	  	  }
	  	});
	  } else {
	  	Test.addTest(data, function(err, data) {
	  	  if (err) {
	  	  	console.log(err);
	  	  } else {
	  	  	console.log(data);
	  	  }
	  	});
	  }
	});

	Image.fetchImage(imgName, type, function(err, imgUrl) {
	  if (err) {
	  	console.log(err);
	  } else {
	  	py.stdin.write(JSON.stringify(imgUrl));
	  }
	  py.stdin.end();
	});
}