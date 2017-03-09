const db = require('./../index.js').db;
const bcrypt = require('bcrypt-nodejs');
const Sequelize = require('sequelize');

////////////////////////////////////////////////////
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

////////////////////////////////////////////////////
const Students = db.define('Students', {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING
  }, {timestamps: false});

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


////////////////////////////////////////////////////
const Classes = db.define('Classes', {
    classname: Sequelize.STRING
    },{timestamps: false});

////////////////////////////////////////////////////
const answerKeys = db.define('answerKeys', {
        keyName: Sequelize.TEXT,
        answers: Sequelize.TEXT,
        URL: Sequelize.TEXT
      }, {timestamps: false});

////////////////////////////////////////////////////
const Tests = db.define('Tests', {
          studentAnswers: Sequelize.TEXT,
          URL: Sequelize.TEXT,
          result: Sequelize.DECIMAL(10,2)
        },{timestamps: false});

////////////////////////////////////////////////////
Teachers.sync().then(function() {

  Students.sync().then(function() {

    Classes.belongsTo(Teachers);
    Teachers.hasMany(Classes);

    Classes.sync().then(function() {

      answerKeys.belongsTo(Classes);
      Classes.hasMany(answerKeys);

      answerKeys.belongsTo(Teachers);
      Teachers.hasMany(answerKeys);

      answerKeys.sync().then(function() {

        //foreign key answerKey
        Tests.belongsTo(answerKeys);
        answerKeys.hasMany(Tests); //TODO: check to see if foreign key auto added

        //foreign key Student who took the test
        Tests.belongsTo(Students);
        Students.hasMany(Tests);

        //foreign key class
        Tests.belongsTo(Classes);
        Classes.hasMany(Tests);

        Tests.sync().then(function() { return;});
      });
    });
  });
});

////////////////////////////////////////////////////
  // const Students = db.define('Students', {
  //   username: Sequelize.STRING,
  //   password: Sequelize.STRING,
  //   firstname: Sequelize.STRING,
  //   lastname: Sequelize.STRING
  // }, {timestamps: false});

  // Students.beforeCreate((student, options, cb) => {
  //   return bcrypt.hash(student.password, null, null, (err, hashedPw) => {
  //     if (!err) {
  //       student.password = hashedPw;
  //       cb(null, options);
  //     } else {
  //       cb(err);
  //     }
  //   });
  // });

  // Students.sync().then(function() {
  //   const Classes = db.define('Classes', {
  //   classname: Sequelize.STRING
  //   },{timestamps: false});

  //   Classes.belongsTo(Teachers);
  //   Teachers.hasMany(Classes);

  //   Classes.sync().then(function() {
  //     const answerKeys = db.define('answerKeys', {
  //       keyName: Sequelize.TEXT,
  //       answers: Sequelize.TEXT,
  //       URL: Sequelize.TEXT
  //     }, {timestamps: false});

  //     answerKeys.belongsTo(Classes);
  //     Classes.hasMany(answerKeys);

  //     answerKeys.belongsTo(Teachers);
  //     Teachers.hasMany(answerKeys);

  //     answerKeys.sync().then(function() {
  //       const Tests = db.define('Tests', {
  //         studentAnswers: Sequelize.TEXT,
  //         URL: Sequelize.TEXT,
  //         result: Sequelize.DECIMAL(10,2)
  //       },{timestamps: false});

  //       //foreign key answerKey
  //       Tests.belongsTo(answerKeys);
  //       answerKeys.hasMany(Tests); //TODO: check to see if foreign key auto added

  //       //foreign key Student who took the test
  //       Tests.belongsTo(Students);
  //       Students.hasMany(Tests);

  //       //foreign key class
  //       Tests.belongsTo(Classes);
  //       Classes.hasMany(Tests);

  //       Tests.sync();
  //     });
  //   });
  // });

  // ////////////////////////////////////////////////////
  // const Classes = db.define('Classes', {
  //   classname: Sequelize.STRING
  //   },{timestamps: false});

  // Classes.belongsTo(Teachers);
  // Teachers.hasMany(Classes);

  // Classes.sync();

  // /////////////////////////////////////////////////
  // const answerKeys = db.define('answerKeys', {
  //   keyName: Sequelize.TEXT,
  //   answers: Sequelize.TEXT,
  //   URL: Sequelize.TEXT
  // }, {timestamps: false});

  // answerKeys.belongsTo(Classes);
  // Classes.hasMany(answerKeys);

  // answerKeys.belongsTo(Teachers);
  // Teachers.hasMany(answerKeys);

  // answerKeys.sync();
  // /////////////////////////////////////////////////
  // //MVP: 1 teacher
  // //MVP+: Multiple teachers. Need foreign key with teacher_id
  // //MVP++: Foreign key for course (group)
  // //MVP+++: Foreign key for sub-course (sub-group)
  // const Tests = db.define('Tests', {
  //   studentAnswers: Sequelize.TEXT,
  //   URL: Sequelize.TEXT,
  //   result: Sequelize.DECIMAL(10,2)
  // },{timestamps: false});

  // //foreign key answerKey
  // Tests.belongsTo(answerKeys);
  // answerKeys.hasMany(Tests); //TODO: check to see if foreign key auto added

  // //foreign key Student who took the test
  // Tests.belongsTo(Students);
  // Students.hasMany(Tests);

  // //foreign key class
  // Tests.belongsTo(Classes);
  // Classes.hasMany(Tests);

  // Tests.sync();

/////////////////////////////////////////////////
module.exports = {
  Tests : Tests,
  answerKeys : answerKeys,
  Students : Students,
  Classes : Classes,
  Teachers : Teachers
}