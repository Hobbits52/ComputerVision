const Sequelize = require('sequelize');
const db = new Sequelize('computervision', 'root', 'password');

exports.db = db;