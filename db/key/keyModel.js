const db = require('./../index.js').db;
const Sequelize = require('sequelize');

const Keys = db.define('Keys', {

}, {timestamps: false});

Keys.belongsTo

Keys.sync();

exports.Keys = Keys;