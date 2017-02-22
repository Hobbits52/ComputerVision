const Sequelize = require('sequelize');
const db = new Sequelize('computervision', 'root', '');

exports.db = db;