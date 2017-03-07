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
    let keyArr = [];
    if (length > 0) {
      fetchedKeys.forEach(function(key) {
        let keyObj = {};
        keyObj.keyId = key.id;
        keyObj.keyName = key.keyName;
        keyObj.answers = key.answers;
        keyArr.push(keyObj);
        counter++;
        if (counter === length) {
          classObj.answerKeys = keyArr;
          console.log('SUCCESS ADDING KEY', classObj);
          cb(null, classObj);
        }
      });
    } else {
      classObj.answerKeys = [];
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
  let keyName = keyInput.keyName;
  let answers = keyInput.answers;
  let ClassId = keyInput.ClassId;
  let TeacherId = keyInput.TeacherId;
    answerKeys.create({
    keyName: keyName,
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



