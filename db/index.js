import { Sequelize } from 'sequelize';
const db = new Sequelize('computervision', 'root', '');

exports.db = db;