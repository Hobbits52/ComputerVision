const answerKeys = require('./keyModel.js').answerKeys;

//MVP: 1 key. No input from server controller except callback
exports.getAnswers = (cb) => {
  //MVP+ : key will be based on keyInput.id
  let answerKeyId = 1;
  answerKeys.findOne({where: {id: answerKeyId}})
  .then((targetKey) => {
    cb(null, targetKey.answers);
  }).catch((err) => {
    cb(err);
  });
};

exports.getAllAnswerKeys = (cb) => {
  answerKeys.findAll()
  .then((fetchedKeys) => {
    cb(null, fetchedKeys);
  }).catch((err) =>{
    cb(err);
  });
};

exports.addKey = (keyInput, cb) => {
  let URL = keyInput.URL;
  //is this a JSON.stringified object?
  let answers = keyInput.answers;
  let ClassesId = keyInput.classId;
  let TeachersId = keyInput.teacherId;

  answerKeys.create({
    answers: answers,
    URL: URL,
    ClassesId: ClassesId,
    TeachersId: TeachersId
  })
  .then((savedKey) => {
    cb(null, savedKey);
  }).catch((err) => {
    cb(err);
  });
};



