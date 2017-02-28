const Tests = require('./testModel.js').Tests;
const Students = require('./../student/studentModel.js').Students;
const StudentsCont = require('./../student/studentController.js');
const answerKeys = require('./../key/keyModel.js').answerKeys;
const helpers = require('./../../src/server/utility/helpers');

exports.getStudentAnswers = (studentId, cb) => {
  //TODO: coordinate input object with server
  //MVP: only one answer key
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

exports.getAllStudentAnswers = (cb) => {
  Tests.findAll()
  .then((fetchedTests) => {
    cb(null, fetchedTests);
  }).catch((err) =>{
    cb(err);
  })
};

exports.addTest = (test, cb) => {
  //MVP: only one answer key
  //MVP: refactor for multiple answer keys
  
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

exports.getClassAnswers = (classId, cb) => {
  let students = {};
  students.length = 0;

  Tests.findAll({where: {ClassId: classId}})
  .then((tests) => {
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
        addStudentNames(students, cb);
      }
    };
  }).catch((err) => {
    cb(err);
  });
};

const addStudentNames = (students, cb) => {
  var counter = 0;
  for(var student in students) {
    console.log('student is: ', student);
    console.log('students is: ', students);
    StudentsCont.addStudentName(students[student], function(err, student) {
      if(err) {
        cb(err);
      } else {
        counter++;
      }
      if (counter === students.length) {
        delete students.length;
        cb(null, students);
      }
    });
  }
};
