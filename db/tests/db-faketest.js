// import { Sequelize } from 'sequelize';
const Sequelize = require('sequelize');
// import { mysql } from 'mysql';
const mysql = require('mysql');
// import { expect } from 'chai'; //check this line of code
const expect = require('chai').expect;
// import Students from './studentModel.js';
const Students = require('./../student/studentModel.js').Students;

//const connection = new Sequelize('computersvision', 'root', 'password');

Students.build({
  username: 'yay',
  password: 'yay'
}).save().then((savedStudent) => {
  console.log('this is the savedStudent', savedStudent);
}).catch((error) => {
  console.log('There was an error', error);
});
