const Students = require('./studentModel.js').Students;
const bcrypt = require('bcrypt-nodejs');
//TODO: Refactor with promises on server side

exports.studentSignup = (studentInput, cb) => {
  let username = studentInput.username;
  let password = studentInput.password;
  let TeacherId = studentInput.TeacherId;
  Students.findOrCreate({where: {username: username},
    defaults: {password: password, TeacherId: TeacherId}})
  .spread((student, created) => {
    if (created === false) {
      let error = "Username already in use";
      cb(error);
    } else {
      let newUser = {};
      newUser.username = student.username;
      cb(null, newUser);
    }
  });
};

exports.studentLogin = (studentInput, cb) => {
  let username = studentInput.username;
  let password = studentInput.password;

  Students.findOne({where: {username: username}})
  .then((student) => {
    bcrypt.compare(password, student.password, (err, res) => {
    if (res !== true) {
      let error = "Username/Password do not match";
      cb(error);
    } else {
      let newUser = {};
      newUser.username = student.username;
      cb(null, newUser);
    }
    })
  }).catch((err) => {
    cb(err);
  });
};