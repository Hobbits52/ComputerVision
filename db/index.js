const Sequelize = require('sequelize');

const db = process.env.CLEARDB_DATABASE_URL ? new Sequelize(process.env.CLEARDB_DATABASE_URL)
                                    : new Sequelize('computervision', 'root', 'password');
exports.db = db;