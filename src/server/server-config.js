const express = require('express');
const session = require('express-session');
const auth = require('./middleware/authentication.js');
const teacherdata = require('./middleware/teacherdatafetcher.js');
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
//app.post('/auth/logout', auth.userLogout);
app.post('/auth/login', auth.userLogin, teacherdata.getTeacherData);
app.post('/auth/signup', auth.userSignup, teacherdata.getTeacherData);
app.post('/teacher/addClass', teacherdata.addClass);
app.post('/teacher/addAnswerKey', teacherdata.addAnswerKey);
//app.post('/teacher/addTest', auth.checkSession, );

app.use(express.static(path.join(__dirname + '/../client/')));

module.exports = app;
