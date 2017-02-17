const expect = require('chai').expect;
const request = require('supertest');

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
    console.log('Test 404');
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });

});