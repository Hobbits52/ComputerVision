const express = require('express');
const session = require('express-session');
const auth = require('./middleware/authentication.js');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(session({
  secret: 'shhh, it\'s a secret',
  cookie: { maxAge: 60000},
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.json());

app.get('/auth/signedIn', auth.checkSession);
app.post('/auth/login', auth.userLogin);
app.post('/auth/signup', auth.userSignup);

app.use(express.static(path.join(__dirname + '/../client/')));

module.exports = app;
