const Teacher = function() {
	const TeacherCon = require('./../teacher/teacherController.js');
	let dummyObj = [
		{username: 'Professor X', password: 'password'}
	];

	var count = 0;
	dummyObj.forEach(function(teacherObj) {
		TeacherCon.Signup(teacherObj, function(err, newTeacher) {
			if (err) {
				console.log('FAIL');
			} else {
				console.log('SUCCESS');
			}
			count++;
			if (count === dummyObj.length) {
				Classes();
			}
		});
	});
};

const Classes = function() {
	const ClassCon = require('./../classes/classController.js');
	let dummyObj = [
		{TeacherId: 1, ClassName: 'Biology 101'}
	];
	var count = 0;
	dummyObj.forEach(function(classObj) {
		ClassCon.addClass(classObj, function(err, newClass) {
			if (err) {
				console.log('FAIL');
			} else {
				console.log('SUCCESS');
			}
			count++;
			if (count === dummyObj.length) {
				Students();
			}
		});
	});
};

const Students = function() {
	const StudentCon = require('./../student/studentController.js');
	const StudentData = require('./studentJSON.json');
	let dummyObj = StudentData;
	var count = 0;

	dummyObj.forEach(function(studentObj) {
		StudentCon.studentSignup(studentObj, function(err, newStudent) {
			if (err) {
				console.log('FAIL');
			} else {
				console.log('SUCCESS');
			}
			count++;
			if (count === dummyObj.length) {
				AnswerKeys();
			}
		});
	});
};


////////////////////////////////////////////////////////////////////////


const AnswerKeys = function() {
	// const Scanner = require('./../../src/server/middleware/pythonChildProcess.js').Scanner;
	// let dummyObj = [
	// 	{'url': 'http://res.cloudinary.com/dn4vqx2gu/image/upload/v1488672122/rzcckliek05taq6a2pul.jpg', 'TeacherId': 1, 'ClassId': 1}
	// ];
	// var count = 0;
	// Scanner(dummyObj[0], 'key', function(err, data) {
	// 	if (err) {
	// 		console.log('FAIL', err);
	// 	} else {
	// 		console.log('SUCCESS');
	// 	}
	// 	count++;
	// 	if (count === dummyObj.length) {
	// 		generateTestData();
	// 	}
	// })
	const KeyCon = require('./../key/keyController.js');
	var keys = require('./answerKey.json').keys;
	var count = 0;
	for (var i = 0; i < keys.length; i++) {
		KeyCon.addKey(keys[i], function(err, data) {
			if (err) {
				console.log('FAIL');
			} else {
				console.log('SUCCESS');
			}
			count++;
			if (count === keys.length) {
				generateTestData();
			}
		});
	}
};

////////////////////////////////////////////////////////////////////////

const generateTestData = function() {
  const TestCon = require('./../test/testController.js');
  var tests = require('./studentAnswers.json').answers;
  var testData = {};
  var url = "http://res.cloudinary.com/dn4vqx2gu/image/upload/v1488672122/rzcckliek05taq6a2pul.jpg";
  var count = 0;
  for (var i = 0; i < tests.length; i++) {
    var temp = {};
    temp.answerkeyId = 1;
    temp.URL = url;
    temp.StudentId = i;
    temp.ClassId = 1; 
    temp.answers = JSON.stringify(tests[i]);
    TestCon.addTest(temp, function(err, data) {
      if (err) {
        console.log('FAIL ' + err);
      } else {
        console.log('SUCCESS');
      }
      count++;
      if (count === tests.length) {
      	console.log('**********COMPLETE**********');
      }
    });
  };
};

Teacher();