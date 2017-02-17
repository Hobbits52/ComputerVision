import { Sequelize } from 'sequelize';
import { mysql } from 'mysql';
import { expect } from 'chai'; //check this line of code
import Students from './studentModel.js';

const db = new Sequelize('computervisiontest', 'root', '');

describe('Students', () => {
  it('Should have a username and password', () => {
    let student = connection.define('student', Students);
    connection.sync().then(() => {
      student.create({
        username: 'straightAstudent'
        password: 'aplus4lyfe'
      }).then((savedStudent) => {
        expect(savedStudent.username).to.equal('straightAstudent');
      });
    });
  });
}