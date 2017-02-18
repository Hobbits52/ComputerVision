const Sequelize = require('sequelize');
const db = new Sequelize('computerv', 'root', 'password');

exports.db = db;