const db = require('./../index.js').db;
const Sequelize = require('sequelize');
const Classes = require('./../classes/classModel').Classes;
const Teachers = require('./../teacher/teacherModel.js').Teachers;

//MVP: 1 key. No associations with courses and teacher
//MVP+: Multiple teachers. Need foreign key with teacher_id
//MVP++: Foreign key for course 
//MVP+++: Add names english names to the keys and english names to the templates (instead of just using key ID to display on front-end)
const answerKeys = db.define('answerKeys', {
  answers: Sequelize.TEXT,
  URL: Sequelize.TEXT
}, {timestamps: false});

answerKeys.belongsTo(Classes);
Classes.hasMany(answerKeys);

answerKeys.belongsTo(Teachers);
Teachers.hasMany(answerKeys);

answerKeys.sync();

exports.answerKeys = answerKeys;