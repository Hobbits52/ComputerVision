const Image = require('./imageFetch.js');
const spawn = require('child_process').spawn;
const py = spawn('python', ['./../utility/scanner.py']);

let dataString = '';

py.stdout.on('data', function(data) {
  dataString += data.toString();
});

py.stdout.on('end', function() {
  console.log('data from py', dataString);
});

//////TESTING DATA
var imgName = 'papillon';
var type = 'test';
///////////////////////

Image.fetchImage(imgName, type, function(err, imgUrl) {
  if (err) {
  	console.log(err);
  } else {
  	py.stdin.write(imgUrl);
  }
  py.stdin.end();
});