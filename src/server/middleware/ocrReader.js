const Tesseract = require('tesseract.js');
const path = require('path');
const image = path.join(__dirname + './../images/image1.JPG');

Tesseract.recognize(image, {lang: 'eng'})
.then(function(result) {
	console.log(result.text);
})