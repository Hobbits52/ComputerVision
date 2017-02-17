import Students from './studentModel.js'
import { bcrypt } from 'bcrypt-nodejs';

//TODO: Refactor with promises on server side

exports.studentSignup = (studentInput, cb) => {
  var username = studentInput.username;
  var password = studentInput.password;

  db.Students.findOrCreate({where: {username: username},
    defaults: {password: password}})
  .spread((student, created) => {
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

exports.userLogin = (studentInput, cb) => {
  var username = studentInput.username;
  var password = studentInput.password;

  db.Customers.findOne({where: {username: username}})
  .then((student) => {
    bcrypt.compare(password, student.password, (err, res) => {
    if (res !== true) {
      var error = "Username/Password do not match";
      cb(error);
    } else {
      var newUser = {};
      newUser.username = student.username;
      cb(null, newUser);
    }
    })
  }).catch((err) => {
    cb(err);
  });
};

