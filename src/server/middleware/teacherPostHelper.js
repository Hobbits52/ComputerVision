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
  		res.end();
  	} else {
  		res.status(200);
      res.send(answerKey);
      res.end();
      Cache.saveTeacherData(keyUpload.TeacherId);
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
      res.end();
    } else {
      //UPDATE REDIS
      res.status(200);
      res.send(test);
      res.end();
      Cache.saveTeacherData(test.TeacherId);
    }
  });
};

//NEW CLASS/////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
const addClass = function(req, res) {
  let classInfo = req.body;
  Classes.addClass(classInfo, function(err, newClass) {
    if (err) {
      res.status(500).send(err);
      res.end();
    } else {
      //UPDATE REDIS
      res.status(200).send(newClass);
      Cache.saveTeacherData(keyUpload.TeacherId);
      res.end();
    }
  })
};

////////////////////////////////////////////////////////////////
module.exports = {
  'AnswerKey': addAnswerKey,
  'Class': addClass,
  'Test': addTest
}
