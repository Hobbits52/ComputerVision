const Teachers = require('./teacherModel.js').Teachers;
const bcrypt = require('bcrypt-nodejs');
const Cache = require('./../../src/server/utility/cacheData.js');
//TODO: Refactor with promises on server side

const Signup = (teacherInput, cb) => {
  let username = teacherInput.username;
  let password = teacherInput.password;

  Teachers.findOrCreate({where: {username: username},
    defaults: {password: password}})
  .spread((teacher, created) => {
    if (created === false) {
      let error = "Username already in use";
      cb(error);
    } else {
      let newUser = {};
      newUser.id = teacher.id;
      newUser.username = teacher.username;
      cb(null, newUser);
    }
  });
};

const Login = (teacherInput, cb) => {
  let username = teacherInput.username;
  let password = teacherInput.password;

  Teachers.findOne({where: {username: username}})
  .then((teacher) => {
    bcrypt.compare(password, teacher.password, (err, res) => {
    if (res !== true) {
      let error = "Username/Password do not match";
      cb(error);
    } else {
      let newUser = {};
      newUser.id = teacher.id;
      newUser.username = teacher.username;
      cb(null, newUser);
    }
    })
  }).catch((err) => {
    cb(err);
  });
};

const Search = (username, cb) => {
  Teachers.findOne({where: {username: username}})
  .then((teacher) => {
    cb(null, teacher);
  }).catch((err) => {
    cb(err);
  });
}

module.exports = {
  'Signup': Signup,
  'Login': Login,
  'Search': Search
}