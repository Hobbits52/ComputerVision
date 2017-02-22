//builds cloudinary address based on whether fetching for answer key or test
  //calls on cloud middleware function to send request to Cloudinary
const Cloud = require('./cloud.js');

exports.fetchImage = function(imgName, type, cb) {
  let imgname;
  if (type === 'key') {
    imgname = '/answerkey/' + imgName;
  } else if (type === 'test') {
    imgname = '/test/' + imgName;
  }

  Cloud.getImageUrl(imgname, function(err, result) {
    if (err) {
      cb(err);
    } else {
      cb(null, result.url);
    }
  });
};
