const Test = require('./../../../db/test/testController.js');
const AnswerKey = require('./../../../db/key/keyController.js');

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
  
}


module.exports = {
  'getTeacherData': getTeacherData
}