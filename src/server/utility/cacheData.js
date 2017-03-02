const Test = require('./../../../db/test/testController.js');
const AnswerKey = require('./../../../db/key/keyController.js');
const Classes = require('./../../../db/classes/classController.js');

const saveTeacherData = function(teacherId) {
  const redisClient = require('./../server.js').redis;
  Classes.getClasses(teacherId, function(err, classes) {
    if (err) {
      console.log(err);
    } else if(classes.length === 0) {
        console.log('Teacher has no classes');
    }else {
      var classesArr = [];
      var counter = 0;
      for (var i = 0; i < classes.length; i++) {
        var classObj = {};
        classObj.classId = classes[i].id;
        classObj.classname = classes[i].classname;

        Test.getClassAnswers(classes[i].id, function(err, students) {
          if(err) {
            console.log(err);
          } else {
            var studentArr = [];
            if (students !== 'noStudent') {
              for (var student in students) {
                studentArr.push(students[student]);
              };
            };
            classObj.students = studentArr;
            classesArr.push(classObj);
            counter++;
            if (counter === classes.length) {
                var k = JSON.stringify(classesArr);
                redisClient.setAsync('teacherData', k).then(function(response) {
                }).catch(function(err) {
                  console.log(err);
                });
            }
          }
        });
      };
    }
  });
};

module.exports = {
  'saveTeacherData': saveTeacherData
}