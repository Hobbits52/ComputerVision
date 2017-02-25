const Students = require('./studentModel.js').Students;

Students.findOrCreate({where: {username: 'Ross'},
    defaults: {password: 'password', TeacherId: 1}})
  .spread((student, created) => {
    if (created === false) {
      let error = "Username already in use";
      console.log(error);
    } else {
      let newUser = {};
      newUser.username = student.username;
      console.log(newUser);
    }
  });