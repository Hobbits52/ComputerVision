import db from ‘./../index.js’;
import { bcrypt } from 'bcrypt-nodejs';

const Students = db.define('Students', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
});

Students.beforeCreate((student, options, cb) => {
  return bcrypt.hash(student.password, null, null, (err, hashedPw) => {
    if (!err) {
      student.password = hashedPw;
      cb(null, options);
    } else {
      cb(err);
    }
  });
});

Students.sync();

exports.Students = Students;