//Connects to cloudinary and fetch image url using image name

const cloudinary = require('cloudinary');
const apiKey = require('./../api_config/config.js');

exports.getImageUrl = function(imgName, cb) {
  cloudinary.config(apiKey.cloudinaryAPI);
  cloudinary.api.resource(imgName,
 	function(result) {
	  cb(null, result);
  }).catch(function(err) {
  	cb(err);
  });
};


  // cloudinary.config(apiKey.cloudinaryAPI);
  // cloudinary.v2.uploader.upload('./testanswer.jpg',
  // 	{public_id: 'answerkey/testkey', upload_preset: 'uqbfq8ql'},
  // 	function(error, result) {
  // 	  if(error) {
  // 	  	console.log(error);
  // 	  }
  // 	  console.log(result)}
  // 	);

