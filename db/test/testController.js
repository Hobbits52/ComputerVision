const Tests = require('./testModel.js').Tests;
const Students = require('./../student/studentModel.js').Students;
const answerKeys = require('./../key/keyModel.js').answerKeys;

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
    if (keyAnswers[key].length > 0 && compareArrays(studentAnswers[key], keyAnswers[key])) {
      amountCorrect++;
    }
  }

  //round to two decimal places
  let percentage = Math.round((amountCorrect/amountPossible) * 100) / 100
  cb(percentage);
};

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
  answerKeys.findOne({where: {id: 1}})
  .then((answerKey) => {
    let keyAnswers = JSON.parse(answerKey.answers);
    let studentResponses = JSON.parse(test.answers);
    calculateResult(studentResponses, keyAnswers, (percentage) => {
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
