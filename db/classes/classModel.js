const db = require('./../index.js').db;
const Sequelize = require('sequelize');
const Teachers = require('./../teacher/teacherModel').Teachers;

const Classes = db.define('Classes', {
  classname: Sequelize.STRING
  },{timestamps: false});

Classes.belongsTo(Teachers);
Teachers.hasMany(Classes);

Classes.sync();

exports.Classes = Classes;