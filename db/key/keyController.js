const Keys = require('./keyModel.js');

//MVP: 1 key. No input from server controller except callback
exports.getAnswers = function(cb) {
  //MVP+ : key will be based on keyInput.id
  var keyId = 1;
  Keys.findOne({where: {id: keyId}})
  .then(function(key) {
    cb(null, key.answers);
  }).catch(function(err) {
    cb(err);
  })
};

exports.addKey = function(key, cb) {
  var URL = key.URL;
  //either convert array to string here, or it's already a string
  var answers = key.answers;
  Keys.create({
    answers: answers,
    URL: URL
  })
  .then(function(savedKey) {
    cb(null, savedKey);
  }).catch(function(err) {
    cb(err);
  });
};



