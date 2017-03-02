const Test = require('./../../../db/test/testController.js');
const AnswerKey = require('./../../../db/key/keyController.js');
const Classes = require('./../../../db/classes/classController.js');
const Scanner = require('./pythontonode.js').Scanner;


//DOCUMENT UPLOAD///////////////////////////////////////////////
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
      //UPDATE REDIS
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
      //UPDATE REDIS
      res.status(200).send(newClass);
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
