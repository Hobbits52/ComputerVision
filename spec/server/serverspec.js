const expect = require('chai').expect;
const request = require('supertest');
const Teachers = require('./../../db//teacherModel.js').Teachers;
const Sequelize = require('sequelize');
const spawn = require('child_process').spawn;
// ----------------------------------------------------------------------
// 'really-need' replaces Node's require with a more powerful version. In 
// addition to a path, it accepts an options object; one of the available
// options is to bust the cache before loading a module.
// ----------------------------------------------------------------------
// require = require('really-need');
// 
// UPDATE 01/30/17:
// ----------------
// 'really-need' does not work for node versions above v4.0.0.  We're
// using v6.1.0.  I'll keep the 'really-need' solution in the code
// (but commented out) as an educational resource, but it will not be
// utilized moving forward.

describe('Loading express', () => {
  
  let server;
  
  beforeEach( () => {
    // Line below utilizes 'really-need':
    // server = require('../../server/server.js', { bustCache: true });
    delete require.cache[require.resolve('./../../src/server/server.js')];
    server = require('./../../src/server/server.js').server;
  });

  afterEach( () => {
    server.close();
    console.log('Server now closed.');
  });

  it('Responds to /', (done) => {
    request(server)
      .get('/')
      .expect(200, done);
  });

  // KG: do we want this behavior? Or reroute?
  xit('404 errors everything else', (done) => {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
});

describe('Authentication', () =>{
  let server;
  
  beforeEach( () => {
    delete require.cache[require.resolve('./../../src/server/server.js')];
    server = require('./../../src/server/server.js').server;
  });

  afterEach( () => {
    server.close();
    console.log('Server now closed.');
  });

  it('Signs user up', (done) => {
    var test = {'username': 'teacher1', 'password': 'password'};
    request(server)
      .post('/auth/signup')
      .send(test)
      .expect(200, done);
  });

  it('Logs in a user', (done) => {
    var test = {'username': 'teacher1', 'password': 'password'};
    request(server)
    .post('/auth/login')
    .send(test)
    .expect(200)
    .end(function() {
      Teachers.destroy({where: {username: 'teacher1'}});
      done();
    });
  })
});

describe('API', () =>{
  let server;
  
  beforeEach( () => {
    delete require.cache[require.resolve('./../../src/server/server.js')];
    server = require('./../../src/server/server.js').server;
  });

  afterEach( () => {
    server.close();
    console.log('Server now closed.');
  });

  it('Does not allow POST request without token to api/addClass', (done) => {
    request(server)
      .post('/api/addClass')
      .expect(403, done);
  });

  it('Does not allow POST request without token to api/addAnswerKey', (done) => {
    request(server)
      .post('/api/addAnswerKey')
      .expect(403, done);
  });

  it('Does not allow POST request without token to api/addTest', (done) => {
    request(server)
      .post('/api/addTest')
      .expect(403, done);
  });

  it('Does not allow GET request without token to api/getClasses', (done) => {
    request(server)
      .get('/api/getClasses')
      .expect(403, done);
  });

  it('Does not allow GET request without token to api/getStudentsforClass', (done) => {
    request(server)
      .get('/api/getStudentsforClass')
      .expect(403, done);
  });

  it('Does not allow GET request without token to api/getAllStudents', (done) => {
    request(server)
      .get('/api/getAllStudents')
      .expect(403, done);
  });


});


xdescribe('Scanner', () => {

  it('Correctly Grades Test Hosted On Cloudinary', (done) => {

    // run Python as child process
    const py = spawn('python', ['./src/server/utility/scanner.py']);
    var testURL = 'http://res.cloudinary.com/dn4vqx2gu/image/upload/v1487892182/p6ybu5bjev1nnfkpebcc.jpg';
   
    let dataString = '';

    py.stdout.on('data', function(data) {
      dataString += data.toString();
    });

    py.stdout.on('end', function() {
      var data = JSON.parse(dataString);
      var answers = data.answers;
      expect(data.URL).to.equal(testURL)
      expect(data.status).to.equal(200)
      expect(answers[1][0]).to.equal('a')
      expect(answers[2][0]).to.equal('c')
      expect(answers[3][0]).to.equal('b')
      expect(answers[4][0]).to.equal('d')
      expect(answers[5][0]).to.equal('d')
      expect(answers[6][0]).to.equal('c')
      expect(answers[7][0]).to.equal('d')
      expect(answers[8][0]).to.equal('b')
      expect(answers[9][0]).to.equal('c')
      expect(answers[10][0]).to.equal('c')
      expect(answers[11][0]).to.equal('c')
      expect(answers[12][0]).to.equal('d')
      expect(answers[13][0]).to.equal('d')
      expect(answers[14][0]).to.equal('c')
      expect(answers[14][1]).to.equal('e')
      expect(answers[15][0]).to.equal('a')
      expect(answers[15][1]).to.equal('b')
      expect(answers[16][0]).to.equal('a')
      expect(answers[17][0]).to.equal('c')
      expect(answers[17][1]).to.equal('d')
      expect(answers[18][0]).to.equal('d')
      expect(answers[19][0]).to.equal('e')
      expect(answers[20][0]).to.equal('c')
      expect(answers[21][0]).to.equal('a')
      expect(answers[22][0]).to.equal('c')
      expect(answers[23][0]).to.equal('c')
      expect(answers[24][0]).to.equal('b')
      expect(answers[25][0]).to.equal('d')
      expect(answers[26][0]).to.equal('d')
      expect(answers[27][0]).to.equal('c')
      expect(answers[28][0]).to.equal('e')
      var doubles = {
        14: true,
        15: true,
        17: true
      }
      for (var i = 1; i <= 28; i ++) {
        if (doubles[i]) {
          expect(answers[i].length).to.equal(2)
        } else {
          expect(answers[i].length).to.equal(1)
        }
      }
      done();
    });

    py.stdin.write(JSON.stringify(testURL));
    py.stdin.end();    
  });

  it('Gracefully handles error from pitch black image', (done) => {

    // run Python as child process
    const py = spawn('python', ['./src/server/utility/scanner.py']);
    var testURL = 'http://res.cloudinary.com/dn4vqx2gu/image/upload/v1487893886/oi5gzyf9sxfho6d76kza.jpg';
  
    let dataString = '';

    py.stdout.on('data', function(data) {
      dataString += data.toString();
    });

    py.stdout.on('end', function() {
      var data = JSON.parse(dataString);
      var answers = data.answers;
      expect(data.URL).to.equal(testURL)
      expect(data.status).to.equal(400)
      done();
    });

    py.stdin.write(JSON.stringify(testURL));
    py.stdin.end();    
  });

  it('Gracefully handles error from image that doesnt include paper', (done) => {

    // run Python as child process
    const py = spawn('python', ['./src/server/utility/scanner.py']);
    var testURL = 'http://res.cloudinary.com/dn4vqx2gu/image/upload/v1487890828/b88ppddfapchcielmif8.jpg';
  
    let dataString = '';

    py.stdout.on('data', function(data) {
      dataString += data.toString();
    });

    py.stdout.on('end', function() {
      var data = JSON.parse(dataString);
      var answers = data.answers;
      expect(data.URL).to.equal(testURL)
      expect(data.status).to.equal(400)
      done();
    });

    py.stdin.write(JSON.stringify(testURL));
    py.stdin.end();    
  });

  it('Gracefully handles error from blurry image when cant find bubbles', (done) => {

    // run Python as child process
    const py = spawn('python', ['./src/server/utility/scanner.py']);
    var testURL = 'http://res.cloudinary.com/dn4vqx2gu/image/upload/v1487892449/a5qapleh05dob9bsisl3.jpg';
  
    let dataString = '';

    py.stdout.on('data', function(data) {
      dataString += data.toString();
    });

    py.stdout.on('end', function() {
      var data = JSON.parse(dataString);
      var answers = data.answers;
      expect(data.URL).to.equal(testURL)
      expect(data.status).to.equal(400)
      done();
    });

    py.stdin.write(JSON.stringify(testURL));
    py.stdin.end();    
  });


});









