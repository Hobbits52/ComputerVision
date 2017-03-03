const Tests = require('./testModel.js').Tests;
const Students = require('./../student/studentModel.js').Students;
const StudentsCont = require('./../student/studentController.js');
const answerKeys = require('./../key/keyModel.js').answerKeys;
const helpers = require('./../../src/server/utility/helpers');

const getStudentAnswers = (studentId, cb) => {
  Tests.findOne({where: {StudentId: studentId}})
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

const getAllStudentAnswers = (cb) => {
  Tests.findAll()
  .then((fetchedTests) => {
    cb(null, fetchedTests);
  }).catch((err) =>{
    cb(err);
  })
};

const addTest = (test, cb) => {
  answerKeys.findOne({where: {id: test.answerkeyId}})
  .then((answerKey) => {
    let keyAnswers = JSON.parse(answerKey.answers);
    let studentResponses = JSON.parse(test.answers);
    helpers.calculateResult(studentResponses, keyAnswers, (percentage) => {
      Tests.create({
        studentAnswers: test.answers,
        URL: test.URL,
        result: percentage,
        StudentId: test.StudentId,
        TeacherId: test.TeacherId,
        ClassId: test.ClassId,
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

const getClassAnswers = (classObj, cb) => {
  let students = {};
  students.length = 0;
  let classId = classObj.classId;
  Tests.findAll({where: {ClassId: classId}})
  .then((tests) => {
    if (tests.length > 0) {
      for(var i = 0; i < tests.length; i++) {
        if(students[tests[i].StudentId] === undefined) {
          students[tests[i].StudentId] = {};
          students[tests[i].StudentId].StudentId = tests[i].StudentId;
          students[tests[i].StudentId].StudentName = "";
          students[tests[i].StudentId].tests = [tests[i]];
          students.length++;
        } else {
          students[tests[i].StudentId].tests.push(tests[i]);
        }
        if (i === tests.length -1) {
          addStudentNames(students, classObj, cb);
        }
      };
    } else {
      classObj.students = [];
      cb(null, classObj);
    }
  }).catch((err) => {
    cb(err);
  });
};

const addStudentNames = (students, classObj, cb) => {
  var counter = 0;
  for(var student in students) {
    if (typeof students[student] === 'object') {
      StudentsCont.addStudentName(students[student], function(err, student) {
        if(err) {
          cb(err);
        } else {
          counter++; 
          if (counter === students.length) {
            delete students.length;
            var studentArr = [];
            for (var student in students) {
              studentArr.push(students[student]);
            };
            classObj.students = studentArr;
            cb(null, classObj);
          }
        }
      });
    }
  }
};


module.exports = {
  'getStudentAnswers': getStudentAnswers,
  'getAllStudentAnswers': getAllStudentAnswers,
  'addTest': addTest,
  'getClassAnswers': getClassAnswers,
  'addStudentNames': addStudentNames
}