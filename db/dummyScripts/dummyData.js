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

