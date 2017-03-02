const Classes = require('./classModel.js').Classes;
const teacherSearch = require('./../teacher/teacherController.js').teacherSearch;


////////////////////////////////////////////////////////////////
exports.addClass = (newClassInput, cb) => {
  var teacherId = newClassInput.TeacherId;
  var newClass = newClassInput.ClassName;
  Classes.findOrCreate({where: {classname: newClass, TeacherId: teacherId}})
  .spread((newclass, created) => {
  	if (created === false) {
  	  let error = "Class already added";
  	  cb(error);
  	} else {
  	  cb(null, newclass);
  	}
  });
};


////////////////////////////////////////////////////////////////

exports.getClasses = (teacherId, cb) => {
  Classes.findAll({where: {TeacherId:teacherId}})
  .then((classes) => {
    cb(null, classes);
  }).catch((err) => {
    cb(err);
  })
};


////////////////////////////////////////////////////////////////
// exports.getClass = (classId, cb) => {
//   let data;
//   Classes.findOne({where: {id: classId}})
//   .then((Class) => {
//     data.classname = Class.classname;
    

//   }).catch((err) {
//     cb(err);
//   })
// };