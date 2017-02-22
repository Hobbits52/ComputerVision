const Sequelize = require('sequelize');
const mysql = require('mysql');
const expect = require('chai').expect;
const answerKeys = require('./../../db/key/keyModel.js').answerKeys;
const Tests = require('./../../db/test/testModel.js').Tests;
const TestController = require('./../../db/test/testController');
const KeyController = require('./../../db/key/keyController');
//note, eventually add require for utility functions

describe('Database Unit Testing - Keys', () => {
  let dbConnection;

  beforeEach((done) => {

    //new connection to database
    dbConnection = mysql.createConnection({
      user: 'root',
      password: '',
      database: 'computervision'
    });

    //establish connection
    dbConnection.connect();

    //new Sequelize in new connection
    let db = new Sequelize('computervision', 'root', '');

    //define schema based on imported answerKeys schema & tests schema
    db.define('answerKeys', answerKeys.schema, answerKeys.options).sync();
    db.define('Tests', Tests.schema, Tests.options).sync().then(() => {

      //delete instead of truncate because of foreign key relations
      dbConnection.query('delete from answerKeys');
      //reset autoincrement for answerKeys table
      dbConnection.query('ALTER TABLE answerKeys AUTO_INCREMENT = 0');

      //delete instead of truncate because of foreign key relations
      dbConnection.query('delete from Tests');
      //reset autoincrement for Tests table
      dbConnection.query('ALTER TABLE Tests AUTO_INCREMENT = 0', done);
    });
  });

  //end connection after each test
  afterEach(() => {
    dbConnection.end();
  })

  //percentage should be 0.8
  let sampleStudentAnswers = {
      1:['A', 'B'], 
      2:['D'],
      3:['C'], //wrong answer
      4:['D'],
      5:['A', 'C'], //wrong answer
      6:['B'],
      7:['A', 'D'],
      8:['B','D'],
      9:['C', 'E'],
      10:['B'], //wrong answer
      11:['A', 'C'],
      12:['B'],
      13:['A'],
      14:['A', 'C'],
      15:['B', 'E'],
      16:['B'],
      17:['E'], //wrong answer
      18:['C', 'E'],
      19:['A', 'E'],
      20:['C'],
      21:[],
      22:[],
      23:[],
      24:[],
      25:[],
      26:[],
      27:[],
      28:[]
    };

  let sampleKeyAnswers = {
      1:['A', 'B'], 
      2:['D'],
      3:['B'], 
      4:['D'],
      5:['A', 'B'], 
      6:['B'],
      7:['A', 'D'],
      8:['B','D'],
      9:['C', 'E'],
      10:['E'],
      11:['A', 'C'],
      12:['B'],
      13:['A'],
      14:['A', 'C'],
      15:['B', 'E'],
      16:['B'],
      17:['A'],
      18:['C', 'E'],
      19:['A', 'E'],
      20:['C'],
      21:[],
      22:[],
      23:[],
      24:[],
      25:[],
      26:[],
      27:[],
      28:[]
  };

  let testInput = {
    answers: JSON.stringify(sampleStudentAnswers),
    URL: 'http://www.example.com/sample1.jpg',
    studentId: 23
  };

  let keyInput = {
    answers: JSON.stringify(sampleKeyAnswers),
    URL: 'http://www.example.com/sample2.jpg'
  };

  let studentInput = {
    id: 23
  };

  it('Should add a test and calculate results', () => {
    KeyController.addKey(keyInput, (err, savedKey) => {
      if (err) {
        console.log(err);
      } else {
        TestController.addTest(testInput, (err, savedTest) => {
          if (err) {
            console.log(err);
          } else {
            expect(savedTest.result).to.equal(0.8);
          }
        });
      }
    });
  });
});