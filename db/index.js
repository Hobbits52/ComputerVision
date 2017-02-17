import { Sequelize } from 'sequelize';
let db = new Sequelize('computervision', 'root', '');

exports.db = db;