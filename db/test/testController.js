const Tests = require('./testModel.js').Tests;
const Students = require('./../student/studentModel.js').Students;
const answerKeys = require('./../key/keyModel.js').answerKeys;

//promise import?

//MVP: 1 key

exports.getStudentAnswers = function(test, cb) {
  //TODO: coordinate input file with server
};

exports.addTest = function(test, cb) {
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

const calculateResult = function(studentAnswers, keyAnswers, cb) {

};

