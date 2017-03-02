const Test = require('./../../../db/test/testController.js');
const AnswerKey = require('./../../../db/key/keyController.js');
const Classes = require('./../../../db/classes/classController.js');
const Scanner = require('./pythontonode.js').Scanner;

////////////////////////////////////////////////////////////////

const getTeacherData = function(req, res) {
  var data = {};
  AnswerKey.getAllAnswerKeys(function(err, fetchedKeys) {
  	if(err) {
  	  res.status(500);
  	  res.end();
  	} else {
  	  data['keys'] = fetchedKeys;
  	  Test.getAllStudentAnswers(function(err, fetchedTests) {
  	  	if(err) {
  	  	  res.status(500);
  	  	  res.end();
  	  	} else {
  	  	  data['studenttests'] = fetchedTests;
  	  	  res.status(200).send(data);
  	  	  res.end();
  	  	}
  	  });
  	}
  });
};

////////////////////////////////////////////////////////////////
const addAnswerKey = function(req, res) {
  let keyUpload = req.body;
  Scanner(keyUpload, 'key', function(err, answerKey) {
  	if(err) {
  		res.status(500);
      res.send(err);
  		res.end();
  	} else {
  		res.status(200);
      res.send(answerKey);
  		res.end();
  	}
  });
};

////////////////////////////////////////////////////////////////
const addTest = function(req, res) {
  let testUpload = req.body;
  Scanner(testUpload, 'test', function(err, test) {
    if(err) {
      res.status(500);
      res.send(err);
      res.end();
    } else {
      res.status(200);
      res.send(test);
      res.end();
    }
  });
}

////////////////////////////////////////////////////////////////
const addClass = function(req, res) {
  let classInfo = req.body;
  Classes.addClass(classInfo, function(err, newClass) {
    if (err) {
      res.status(500).send(err);
      res.end();
    } else {
      res.status(200).send(newClass);
      res.end();
    }
  })
};


////////////////////////////////////////////////////////////////
const getClasses = function(req, res) {
  const teacherId = req.query.teacher_id;
  Classes.getClasses(teacherId, function(err, classes) {
    if (err) {
      res.status(500).send(err);
      res.end();
    } else {
      res.status(200).send(classes);
      res.end();
    }
  })
};

////////////////////////////////////////////////////////////////
const getStudentsforClass = function(req, res) {
  const classId = req.query.class_id;
  Test.getClassAnswers(classId, function(err, students) {
    if(err) {
      res.status(400).send(err);
      res.end();
    } else {
      res.status(200).send(students);
      res.end();
    }
  });
}

////////////////////////////////////////////////////////////////
const getAllStudents = function(req, res) {
  const teacherId = req.query.teacher_id;
  console.log('teacherId is: ', teacherId);
  Classes.getClasses(teacherId, function(err, classes) {
    if (err) {
      res.status(400).send(err);
      // res.end();
    } else if(classes.length === 0) {
        res.status(400).send({});
        // res.end();
    }else {
      var classesArr = [];
      var counter = 0;
      for (var i = 0; i < classes.length; i++) {
        var classObj = {};
        classObj.classname = classes[i].classname;
        Test.getClassAnswers(classes[i].id, function(err, students) {
          if(err) {
            res.status(400).send(err);
            // res.end();
          } else {
            var studentArr = [];
            for (var student in students) {
              studentArr.push(students[student]);
            }
            classObj.students = studentArr;
            classesArr.push(classObj);
            counter++;
            if (counter === classes.length) {
              res.status(200).send(classesArr);
              // res.end();
            }
          }
        });
      }
    }
  });
}
////////////////////////////////////////////////////////////////
module.exports = {
  'getTeacherData': getTeacherData,
  'addAnswerKey': addAnswerKey,
  'addClass': addClass,
  'addTest': addTest,
  'getClasses': getClasses,
  'getStudentsforClass': getStudentsforClass,
  'getAllStudents': getAllStudents
}
