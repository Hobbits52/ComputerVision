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
        Test.getClassAnswers(classObj, function(err, classObject) {
          if(err) {
            console.log(err);
          } else {
            classesArr.push(classObject);
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


const getCache = function() {
  const redisClient = require('./../server.js').redis;
  return redisClient.getAsync('teacherData').then(function(response) {
    var k = JSON.parse(response);
    return k;
  }).catch(function() {
    var error = 'Something went wrong with cache fetching';
    return error;
  })
};

module.exports = {
  'saveTeacherData': saveTeacherData,
  'getCache': getCache
}