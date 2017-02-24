const Test = require('./../../../db/test/testController.js');
const AnswerKey = require('./../../../db/key/keyController.js');
const Scanner = require('./pythontonode.js').Scanner;

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

const addAnswerKey = function(req, res) {
  let keyUpload = req.body;
  Scanner(keyUpload, 'key', function(err, answerKey) {
  	if(err) {
  		req.status(500);
  		res.end();
  	} else {
  		req.status(200).send(answerKey);
  		req.end();
  	}
  });
};


module.exports = {
  'getTeacherData': getTeacherData,
  'addAnswerKey' : addAnswerKey
}