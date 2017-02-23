const Tests = require('./testModel.js').Tests;
const Students = require('./../student/studentModel.js').Students;
const answerKeys = require('./../key/keyModel.js').answerKeys;
const helpers = require('./../../src/server/utility/helpers');

exports.getStudentAnswers = (student, cb) => {
  //TODO: coordinate input object with server
  //MVP: only one answer key
  Tests.findOne({where: {StudentId: student.id}})
  .then((fetchedTest) => {
    let testObj = {
      studentAnswers: fetchedTest.studentAnswers,
      result: fetchedTest.result
    };
    cb(null, testObj);
  }).catch((err) => {
    cb(err);
  });
};

exports.addTest = (test, cb) => {
  //MVP: only one answer key
  //MVP: refactor for multiple answer keys
  answerKeys.findOne({where: {id: 8}})
  .then((answerKey) => {
    console.log('AAAAAA', answerKey.answers);
    let keyAnswers = JSON.parse(answerKey.answers);
    let studentResponses = JSON.parse(test.answers);
    helpers.calculateResult(studentResponses, keyAnswers, (percentage) => {
      Tests.create({
        studentAnswers: test.answers,
        URL: test.URL,
        result: percentage,
        StudentId: test.studentId,
        answerKeyId: answerKey.id
      })
      .then((savedTest) => {
        cb(null, savedTest);
      }).catch((err) => {
        cb(err);
      });
    });
  }).catch((err) => {
    cb(err);
  });
};