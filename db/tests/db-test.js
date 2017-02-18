// import { Sequelize } from 'sequelize';
const Sequelize = require('sequelize');
// import { mysql } from 'mysql';
const mysql = require('mysql');
// import { expect } from 'chai'; //check this line of code
const expect = require('chai').expect;
// import Students from './studentModel.js';
const Students = require('./../student/studentModel.js');

const connection = new Sequelize('computervisiontest', 'root', 'password');

describe('Students', () => {
  it('Should have a username and password', () => {
    let student = connection.define('student', Students);
    connection.sync().then(() => {
      student.create({
        username: 'straightAstudent',
        password: 'aplus4lyfe'
      }).then((savedStudent) => {
        expect(savedStudent.username).to.equal('straightAstudent');
      });
    });
  });
});