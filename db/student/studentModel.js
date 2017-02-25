const db = require('./../index.js').db;
const bcrypt = require('bcrypt-nodejs');
const Sequelize = require('sequelize');
const Teachers = require('./../teacher/teacherModel').Teachers;

const Students = db.define('Students', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
}, {timestamps: false});

Students.belongsTo(Teachers);
Teachers.hasMany(Students);

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
