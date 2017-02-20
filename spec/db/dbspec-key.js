const Sequelize = require('sequelize');
const mysql = require('mysql');
const expect = require('chai').expect;
const answerKeys = require('./../../db/key/keyModel.js').answerKeys;

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

    //define schema based on imported keyModel schema
    db.define('answerKeys', answerKeys.schema, answerKeys.options).sync().then(() => {
      //clear contents after each test
      let tablename = 'answerKeys';
      dbConnection.query('truncate ' + tablename, done);
    });
  });

  //end connection after each test
  afterEach(() => {
    dbConnection.end();
  })

  it('Should store answers in JSON stringified form', () => {
    var sampleAnswers = {
      1:['A','B'], 
      2:['D']
    };
    sampleAnswers = JSON.stringify(sampleAnswers);
    answerKeys.build({
      answers: sampleAnswers,
      URL: 'http://www.example.com/sample.jpg'
    }).save().then((savedKey) => {
      var savedAnswers = JSON.parse(savedKey.answers);
      expect(savedAnswers[1][0]).to.equal('A');
    });
  });

  it('Should have a URL', () => {
    var beginUrl = 'http://'
    var sampleAnswers = {
      1:['A','B'], 
      2:['D']
    };
    sampleAnswers = JSON.stringify(sampleAnswers);
    answerKeys.build({
      answers: sampleAnswers,
      URL: 'http://www.example.com/sample.jpg'
    }).save().then((savedKey) => {
      expect(savedKey.URL.slice(0,7)).to.equal(beginUrl);
    });
  });
});