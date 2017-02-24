const db = require('./../index.js').db;
const Sequelize = require('sequelize');
const Teachers = require('./../teacher/teacherModel').Teachers;

const Classes = db.define('Classes', {
  classname: Sequelize.STRING
  },{timestamps: false});

Teachers.hasMany(Classes);
Classes.belongsTo(Teachers);

Classes.sync();
exports.Classes = Classes;