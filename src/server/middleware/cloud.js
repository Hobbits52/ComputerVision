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
