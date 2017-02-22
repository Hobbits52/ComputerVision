const expect = require('chai').expect;
const request = require('supertest');
const Teachers = require('./../../db/teacher/teacherModel.js').Teachers;
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
    server = require('./../../src/server/server.js');
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

  it('404 errors everything else', (done) => {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
});

describe('Authentication', () =>{
  let server;
  
  beforeEach( () => {
    delete require.cache[require.resolve('./../../src/server/server.js')];
    server = require('./../../src/server/server.js');
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

xdescribe('Fetching image from Cloudinary', () =>{
  let cloud = require('./../../src/server/middleware/cloud.js');
  let url;
  it('Fetches an image when given an image name', (done) => {
    cloud.getImageUrl('/test/papillon', function(err, result) {
      if (err) {
        console.log(err);
      } else {
        url = result.url;
      }
      expect(url).to.equal('http://res.cloudinary.com/dn4vqx2gu/image/upload/v1487621067/test/papillon.jpg');
      done();
    });
  });

  url = '';
  let Image = require('./../../src/server/middleware/imageFetch.js');
  let imgName = 'papillon';
  let type = 'test';

  it('Fetches an image when given an image name and folder name', (done) => {
    Image.fetchImage(imgName, type, function(err, imgUrl) {
      if (err) {
        console.log(err);
      } else {
        url = imgUrl;
      }

      expect(url).to.equal('http://res.cloudinary.com/dn4vqx2gu/image/upload/v1487621067/test/papillon.jpg');
      done();
    })
  });
});

describe('Scanner', () =>{

  it('Correctly Grades Test Hosted On Cloudinary', (done) => {

    // run Python as child process
    const py = spawn('python', ['./src/server/utility/scanner.py']);
    var testUrl = 'http://res.cloudinary.com/dn4vqx2gu/image/upload/v1487791060/test1resized_v0swpw.jpg'
   
    let dataString = '';

    py.stdout.on('data', function(data) {
      dataString += data.toString();
    });

    py.stdout.on('end', function() {
      var answers = JSON.parse(dataString)
      expect(answers[1][0]).to.equal('a')
      expect(answers[2][0]).to.equal('c')
      expect(answers[3][0]).to.equal('b')
      expect(answers[4][0]).to.equal('d')
      expect(answers[5][0]).to.equal('e')
      expect(answers[6][0]).to.equal('c')
      expect(answers[1].length).to.equal(1)
      expect(answers[2].length).to.equal(1)
      expect(answers[3].length).to.equal(1)
      expect(answers[4].length).to.equal(1)
      expect(answers[5].length).to.equal(1)
      expect(answers[6].length).to.equal(1)
      expect(answers[7].length).to.equal(0)
      expect(answers[8].length).to.equal(0)
      expect(answers[9].length).to.equal(0)
      expect(answers[10].length).to.equal(0)
      expect(answers[11].length).to.equal(0)
      expect(answers[12].length).to.equal(0)
      expect(answers[13].length).to.equal(0)
      expect(answers[14].length).to.equal(0)
      expect(answers[15].length).to.equal(0)
      expect(answers[16].length).to.equal(0)
      expect(answers[17].length).to.equal(0)
      expect(answers[18].length).to.equal(0)
      expect(answers[19].length).to.equal(0)
      expect(answers[20].length).to.equal(0)
      expect(answers[21].length).to.equal(0)
      expect(answers[22].length).to.equal(0)
      expect(answers[23].length).to.equal(0)
      expect(answers[24].length).to.equal(0)
      expect(answers[25].length).to.equal(0)
      expect(answers[26].length).to.equal(0)
      expect(answers[27].length).to.equal(0)
      expect(answers[28].length).to.equal(0)
      done();
    });

    py.stdin.write(JSON.stringify(testUrl));
    py.stdin.end();    
  });
});









