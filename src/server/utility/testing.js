const spawn = require('child_process').spawn;
const path = require('path');

const Scanner = function() {
	let url = "http://res.cloudinary.com/dn4vqx2gu/image/upload/v1488077738/a3hnxbqg4fjbbycimci6.jpg";
	let dataString = '';

	//Initiates new scanner.py child process//////////////////////////////////////
	const py = spawn('python', [path.join(__dirname + '/../utility/scanner.py')]);

	//send image url to scanner.py for processing/////////////////////////////////
	py.stdin.write(JSON.stringify(url));
	py.stdin.end();

	//record scanner.py output stream as a string value///////////////////////////
	py.stdout.on('data', function(data) {
	  dataString += data.toString();
	  console.log('*****', dataString);
	});

	//process scanner.py output once output stream ends///////////////////////////
	py.stdout.on('end', function() {
	  let data = JSON.parse(dataString);
	  if (data.status === 400) {
	  	console.log('end error', data.message);
	  } else {
		  data.answers = JSON.stringify(data.answers);
		  console.log('end data', data);
		}
	});


	//Error handing in python process/////////////////////////////////////////////
	py.stderr.on('data', function(data) {
		console.log('stderr: ' + data);
	});

	//Event listener for successful end of python process/////////////////////////
	py.on('close', function(code) {
		console.log('Child process exited with code ' + code);
	});
};

Scanner();