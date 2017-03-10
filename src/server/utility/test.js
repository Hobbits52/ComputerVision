var Scanner = require('./../middleware/pythonChildProcess.js').Scanner;

var uploadFile = {
	url: "http://res.cloudinary.com/dn4vqx2gu/image/upload/v1488672122/rzcckliek05taq6a2pul.jpg",
	ClassId: 1,
	TeacherId: 1,
	keyName: 'Exit Interview'
};

Scanner(uploadFile, 'key', function(err, data) {
	if (err) {
		console.log(err);
	} else {
		console.log('***********', data);
	}
});