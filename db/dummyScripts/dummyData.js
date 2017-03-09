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
				//generateTestData();
				console.log('********COMPLETE*********');
				return;
			}
		});
	}
};

////////////////////////////////////////////////////////////////////////

+const generateTestData = function() {
  const TestCon = require('./../test/testController.js');
  var tests = require('./studentAnswers.json').answers;
  var testData = {};
  var url = "http://res.cloudinary.com/dn4vqx2gu/image/upload/v1488672122/rzcckliek05taq6a2pul.jpg";
  var examCount = 0;
  var loopcount = 0;
 
  const loopExams = function(examCount) {
   var exam = tests[examCount].tests;
   var testCount = 0;
   const loopTests = function(examCount, testCount) {
     loopcount++;
     var temp = {};
     temp.answerkeyId = examCount + 1;
     temp.URL = url;
     temp.StudentId = testCount + 1;
     temp.ClassId = 1;
     temp.answers = JSON.stringify(exam[testCount]);

     TestCon.addTest(temp, function(err, data) {
       if (err) {
         testCount = exam.length - 1;
         examCount = tests.length - 1;
        console.log('FAIL*****************', err);
       } else {
         console.log('SUCCESS');
       }
       testCount++;
       if (testCount === exam.length) {
         console.log(testCount);
         examCount++;
         console.log(examCount);
         if (examCount === 2) {
           console.log('**********COMPLETE**********');
           console.log(loopcount);
           return;
         } else {
           loopExams(examCount);
         }
       } else {
         loopTests(examCount, testCount);
       }
     });
   };
   loopTests(examCount, testCount);
  };
 
  loopExams(examCount);
 };
 
 generateTestData();


