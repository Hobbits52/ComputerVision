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
	cache.forEach(function(course) {
		counter++;
		if (classes === undefined) {
			classes = [];
		}
		let courseObj = {'ClassId': course.classId,
											 'ClassName': course.classname};
		classes.push(courseObj);
		if (counter === length) {
			cb(null, classes);
		}
	});
};

///////////////////////////////////////////////////////////////

module.exports = {
	'getStudents': getStudents,
	'getClasses': getClasses
}