const express = require('express');
const session = require('express-session');
const auth = require('./middleware/authentication.js');
const path = require('path');

const app = express();

app.use(session({
  secret: 'shhh, it\'s a secret',
  cookie: { maxAge: 60000},
}));

app.get('/auth/signedIn', auth.checkSession);
app.use(express.static(path.join(__dirname + '/../client/')));

module.exports = app;