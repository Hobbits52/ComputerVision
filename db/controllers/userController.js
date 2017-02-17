var db = require('../index.js');
var bcrypt = require('bcrypt-nodejs');

exports.studentSignup = function(studentInput, cb) {
  var username = studentInput.username;
  var password = studentInput.password;

  db.Students.findOrCreate({where: {username: username},
    defaults: {password: password}})
  .spread(function(student, created) {
    if (created === false) {
      var error = "Username already in use";
      cb(error);
    } else {
      var newUser = {};
      newUser.username = student.username;
      cb(null, newUser);
    }
  });
};

