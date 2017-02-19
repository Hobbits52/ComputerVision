const db = require('./../index.js').db;
const bcrypt = require('bcrypt-nodejs');
const Sequelize = require('sequelize');

const Teachers = db.define('Teachers', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
}, {timestamps: false});

Teachers.beforeCreate((teacher, options, cb) => {
  return bcrypt.hash(teacher.password, null, null, (err, hashedPw) => {
    if (!err) {
      teacher.password = hashedPw;
      cb(null, options);
    } else {
      cb(err);
    }
  });
});

Teachers.sync();

exports.Teachers = Teachers;