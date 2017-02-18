const Sequelize = require('sequelize');
const mysql = require('mysql');
const expect = require('chai').expect;
const Students = require('./../student/studentModel.js').Students;

describe('Students', () => {
  it('Should have a username', () => {
    Students.build({
      username: 'newStudent',
      password: 'woohoo'
    }).save().then((savedStudent) => {
      expect(savedStudent.username).to.equal('newStudent');
    }).catch((error) => {
      console.log('There was an error', error);
    });
  });
});


