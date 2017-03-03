const getStudents = (cache, cb) => {

	let studentsByClass = [];
	let counter = 0;
	let length = cache.length;

	cache.forEach(function(course) {
		counter++;
		let courseObj = {};
		courseObj.class = {'ClassId': course.ClassId,
											 'ClassName': course.classname,
											};
		courseObj.students = [];
		course.students.forEach(function(student) {
			courseObj.students.push({StudentId: student.StudentId,
															 StudentName: student.StudentName
															});
		});
		studentsByClass.push(courseObj);
		if (counter === length) {
			cb(null, studentsByClass);
		}
	});
};

///////////////////////////////////////////////////////////////
const getClasses = (cache, cb) => {
	let classes;
	let counter = 0;
	let length = cache.length;
	console.log('this is the cache', cache);
	cache.forEach(function(course) {
		counter++;
		if (classes === undefined) {
			classes = [];
		}
		let courseObj = {'ClassId': course.classId,
										 'ClassName': course.classname};
		classes.push(courseObj);
		if (counter === length) {
			console.log('this is classes', classes);
			cb(null, classes);
		}
	});
};

///////////////////////////////////////////////////////////////
const getTestsForClass = (cache, classId, cb) => {
	let course = cache.filter(function(cls) {
		return cls.classId === parseInt(classId, 10);
	});

	if (course.length > 0) {
		cb(null, course);
	} else {
		let error = 'No such class in database';
		cb(error);
	}
};

///////////////////////////////////////////////////////////////
const getKeysForClass = (cache, classId, cb) => {
	let course = cache.filter(function(cls) {
		return cls.classId === parseInt(classId, 10);
	});

	if (course.length > 0) {
		let classObj = {};
		console.log('************', course);
		classObj.classId = course[0].classId;
		classObj.classname = course[0].classname;
		classObj.answerkey = course[0].answerKey;
		cb(null, classObj);
	} else {
		let error = 'No such class in database';
		cb(error);
	}
};

///////////////////////////////////////////////////////////////
module.exports = {
	'getStudents': getStudents,
	'getClasses': getClasses,
	'getTestsForClass': getTestsForClass,
	'getKeysForClass': getKeysForClass
};