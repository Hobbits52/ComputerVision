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

exports.getKeysForClass = (classId, classObj, cb) => {
  answerKeys.findAll({where: {ClassId: classId}})
  .then((fetchedKeys) => {
    let length = fetchedKeys.length;
    let counter = 0;
    let keyObj = {};
    if (length > 0) {
      fetchedKeys.forEach(function(key) {
        keyObj[key.id] = key.answers;
        counter++;
        if (counter === length) {
          classObj.answerKey = keyObj;
          console.log('SUCCESS ADDING KEY', classObj);
          cb(null, classObj);
        }
      });
    } else {
      classObj.answerKey = keyObj;
      console.log('NO KEY TO ADD', classObj);
      cb(null, classObj);
    }
  }).catch((err) => {
      cb(err);
  });
};

exports.addKey = (keyInput, cb) => {
  let URL = keyInput.URL;
  //is this a JSON.stringified object?
  let answers = keyInput.answers;
  let ClassId = keyInput.ClassId;
  let TeacherId = keyInput.TeacherId;
    answerKeys.create({
    answers: answers,
    URL: URL,
    ClassId: ClassId,
    TeacherId: TeacherId
  })
  .then((savedKey) => {
    console.log(savedKey);
    cb(null, savedKey);
  }).catch((err) => {
    cb(err);
  });
};



