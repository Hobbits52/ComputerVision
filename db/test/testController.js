const Tests = require('./testModel.js').Tests;
const Students = require('./../student/studentModel.js').Students;
const answerKeys = require('./../key/keyModel.js').answerKeys;

//promise import?

//MVP: 1 key

const compareArrays = (array1, array2) => {
  if (array1.length !== array2.length) {
    return false;
  }
  return array1.reduce((acc, val, index) => {
    return acc && val === array2[index];
  }, true);
};

const calculateResult = (studentAnswers, keyAnswers, cb) => {
  let amountPossible = 0;
  for (let key in keyAnswers) {
    if (keyAnswers[key].length > 0) {
      amountPossible++;
    }
  }
  let amountCorrect = 0;
  for (let key in studentAnswers) {
    if ()
  }
};

exports.getStudentAnswers = (test, cb) => {
  //TODO: coordinate input file with server
};

exports.addTest = (test, cb) => {
  answerKeys.findOne(where: {id: test.answerKeysId})
  .then((answerKey) => {
    let keyAnswers = JSON.parse(answerKey.answers);
    Tests.findOne(where: {id: test.id})
    .then((testResult) => {
      let studentResponses = JSON.parse(testResult.studentAnswers);
      let amountCorrect = 0;
      calculateResult(studentResponses, keyAnswers, (percentage) => {
        cb(null, percentage);
      });
    }).catch((err) => {
      cb(err);
    });
  }).catch((err) => {
    cb(err);
  });
};
