const Test = require('./../../../db/test/testController.js');
const AnswerKey = require('./../../../db/key/keyController.js');
const Classes = require('./../../../db/classes/classController.js');
const Scanner = require('./pythonChildProcess.js').Scanner;
const Cache = require('./../utility/cacheData.js');
const Redis = require('./../server.js').redis;


//DOCUMENT UPLOAD///////////////////////////////////////////////
////////////////////////////////////////////////////////////////
//ANSWER KEY UPLOAD/////////////////////////////////////////////
const addAnswerKey = function(req, res) {
  let keyUpload = req.body;
  Scanner(keyUpload, 'key', function(err, answerKey) {
  	if(err) {
  		res.status(500);
      res.send(err);
  		return res.end();
  	} else {
  		res.status(200);
      res.send(answerKey);
      Cache.saveTeacherData(keyUpload.TeacherId);
  		return res.end();
  	}
  });
};

////////////////////////////////////////////////////////////////
//TEST UPLOAD///////////////////////////////////////////////////
const addTest = function(req, res) {
  let testUpload = req.body;
  Scanner(testUpload, 'test', function(err, test) {
    if(err) {
      res.status(500);
      res.send(err);
      return res.end();
    } else {
      //UPDATE REDIS
      res.status(200);
      res.send(test);
      console.log('******', test.TeacherId);
      Cache.getCache(test.TeacherId).then(function(data) {
        if(data === null) {
          res.end();
        } else {
          Cache.saveTeacherData(test.TeacherId);
        }
      });
      return res.end();
    }
  });
}

//NEW CLASS/////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
const addClass = function(req, res) {
  let classInfo = req.body;
  Classes.addClass(classInfo, function(err, newClass) {
    if (err) {
      res.status(500).send(err);
      return res.end();
    } else {
      //UPDATE REDIS
      res.status(200).send(newClass);
      Cache.saveTeacherData(keyUpload.TeacherId);
      return res.end();
    }
  })
};

////////////////////////////////////////////////////////////////
module.exports = {
  'AnswerKey': addAnswerKey,
  'Class': addClass,
  'Test': addTest
}
