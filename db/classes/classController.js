const Classes = require('./classModel.js').Classes;
const teacherSearch = require('./../teacher/teacherController.js').teacherSearch;

exports.addClass = (newClassInput, cb) => {
  var teacher = newClassInput.teacher;
  var newClass = newClassInput.classname;
  teacherSearch(teacher, function(err, teacher) {
  	if(err) {
 	  cb(err);
  	} else {
  	  let teacherId = teacher.id;
  	  Classes.findOrCreate({where: {classname: newClass, TeachersId: teacherId}})
  	  .spread((newclass, created) => {
  	  	if (created === false) {
  	  	  let error = "Class already added";
  	  	  cb(error);
  	  	} else {
  	  	  cb(null, newclass);
  	  	}
  	  });
  	}
  });
};