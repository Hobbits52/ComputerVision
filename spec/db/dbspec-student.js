const Sequelize = require('sequelize');
const mysql = require('mysql');
const expect = require('chai').expect;
const Students = require('./../../db/student/studentModel.js').Students;

describe('Database Unit Testing - Students', () => {
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

    //define schema based on imported studentModel schema
    db.define('Students', Students.schema, Students.options).sync().then(() => {
      //clear contents after each test
      let tablename = 'Students';
      dbConnection.query('truncate ' + tablename, done);
    });
  });

  //end connection after each test
  afterEach(() => {
    dbConnection.end();
  })

  it('Should have a username', () => {
    Students.build({
      username: 'farmerjosephine',
      password: 'ilikeproduce'
    }).save().then((savedStudent) => {
      expect(savedStudent.username).to.equal('farmerjosephine');
    });
  });

  it('Should have a password that is hashed', () => {
    let hashBegin = '$2a$10';
    Students.build({
      username: 'soccerfan',
      password: 'thisIsSupposedTobeHashed'
    }).save().then((savedStudent) => {
      expect(savedStudent.password).to.not.equal('thisIsSupposedTobeHashed');
      expect(savedStudent.password.slice(0,6)).to.equal(hashBegin);
    });
  });
});

