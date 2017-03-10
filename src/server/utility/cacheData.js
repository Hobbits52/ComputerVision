const Test = require('./../../../db/test/testController.js');
const Key = require('./../../../db/key/keyController.js');
const Classes = require('./../../../db/classes/classController.js');
const bluebird = require('bluebird');

const saveTeacherData = function(teacherId) {
  const redisClient = require('./../server.js').redis;
  Classes.getClasses(teacherId, function(err, classes) {
    if (err) {
      console.log(err);
    } else if(classes.length === 0) {
        console.log('Teacher has no classes');
    }else {
      let counter = 0;
      let classesArr = [];
      for (var i = 0; i < classes.length; i++) {
        let classObj = {};
        classObj.classId = classes[i].id;
        classObj.classname = classes[i].classname;
        Key.getKeysForClass(classes[i].id, classObj, function(err, classObject) {
          if (!err) {
            let clsObj = classObject;
            Test.getClassAnswers(clsObj, function(err, classO) {
              if(err) {
                console.log(err);
              } else {
                classesArr.push(classO);
                counter++;
                if (counter === classes.length) {
                  var teacherData = JSON.stringify(classesArr);
                  redisClient.setAsync(teacherId, teacherData).then(function(response) {
                  }).catch(function(err) {
                    console.log(err);
                  });
                }
              }
            });
          } else {
            console.log(err);
          }
        });
      };
    }
  });
};

const getCache = function(teacherId) {
  const redisClient = require('./../server.js').redis;
  return redisClient.getAsync(teacherId).then(function(response) {
    var k = JSON.parse(response);
    return k;
  }).catch(function(err) {
    var error = 'Something went wrong with cache fetching';
    return ( err);
  })
};

module.exports = {
  'saveTeacherData': saveTeacherData,
  'getCache': getCache
}