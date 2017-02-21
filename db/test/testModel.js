const db = require('./../index.js').db;
const Sequelize = require('sequelize');
const answerKeys = require('./../key/keyModel').answerKeys;

//MVP: 1 teacher
//MVP+: Multiple teachers. Need foreign key with teacher_id
//MVP++: Foreign key for course (group)
//MVP+++: Foreign key for sub-course (sub-group)
const Tests = db.define('Tests', {
  studentAnswers: Sequelize.TEXT,
  URL: URL: Sequelize.TEXT
},{timestamps: false});


answerKeys.hasMany(Tests); //add foreign key, or auto? //check when do tests
Tests.belongsTo(answerKeys);

Tests.sync();

exports.Tests = Tests;