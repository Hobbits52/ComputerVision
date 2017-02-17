var db = require(‘./../index.js’).db;
var bcrypt = require('bcrypt-nodejs');

var Students = db.define('Students', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
});

Students.beforeCreate(function(student, options, cb) {
  return bcrypt.hash(student.password, null, null, function(err, hashedPw) {
    if (!err) {
      student.password = hashedPw;
      cb(null, options);
    } else {
      throw err;
    }
  });
});


exports.Students = Students;