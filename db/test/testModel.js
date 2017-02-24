const db = require('./../index.js').db;
const Sequelize = require('sequelize');
const answerKeys = require('./../key/keyModel').answerKeys;
const Students = require('./../student/studentModel').Students;
const Classes = require('./../classes/classModel').Classes;

//MVP: 1 teacher
//MVP+: Multiple teachers. Need foreign key with teacher_id
//MVP++: Foreign key for course (group)
//MVP+++: Foreign key for sub-course (sub-group)
const Tests = db.define('Tests', {
  studentAnswers: Sequelize.TEXT,
  URL: Sequelize.TEXT,
  result: Sequelize.DECIMAL(10,2)
},{timestamps: false});

//foreign key answerKey
answerKeys.hasMany(Tests); //TODO: check to see if foreign key auto added
Tests.belongsTo(answerKeys);

//foreign key Student who took the test
Students.hasMany(Tests);
Tests.belongsTo(Students);

//foreign key class
Classes.hasMany(Tests);
Tests.belongsTo(Classes);

Tests.sync();

exports.Tests = Tests;