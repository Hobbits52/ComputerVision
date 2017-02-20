const answerKeys = require('./keyModel.js').answerKeys;

//MVP: 1 key. No input from server controller except callback
exports.getAnswers = (cb) => {
  //MVP+ : key will be based on keyInput.id
  var answerKeyId = 1;
  Keys.findOne({where: {id: answerKeyId}})
  .then((targetKey) => {
    cb(null, targetKey.answers);
  }).catch((err) => {
    cb(err);
  })
};

exports.addKey = (keyInput, cb) => {
  var URL = keyInput.URL;
  //either convert array to string here, or it's already a string
  var answers = keyInput.answers;
  Keys.create({
    answers: answers,
    URL: URL
  })
  .then((savedKey) => {
    cb(null, savedKey);
  }).catch((err) => {
    cb(err);
  });
};



