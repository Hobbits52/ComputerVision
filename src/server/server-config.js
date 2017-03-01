const express = require('express');
const session = require('express-session');
// const jwt = require('express-jwt');
const jwt    = require('jsonwebtoken')
const auth = require('./middleware/authentication.js');
const teacherdata = require('./middleware/teacherdatafetcher.js');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// FOR DEV: take out 'morgan' line before deployment
app.use(require('morgan')('dev'));

app.use(session({
  secret: 'shhh, it\'s a secret',
  cookie: { maxAge: 60000},
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.json());

// app.get('/protected',
//   jwt({secret: 'shhhhhhared-secret'}),
//   function(req, res) {
//     if (!req.user.admin) return res.sendStatus(401);
//     res.sendStatus(200);
//   });

app.get('/sample', auth.checkToken, function(req,res) {
	res.status(200).send('Got through authentication!');
      res.end();
})

app.post('/authenticate', function(req,res) {
	console.log('authenticate called ---------------------------------------')
  // console.log(req.body.username)

  // if (req.body.username === 'abc') {
    var token = jwt.sign({key: 'sample'}, 'secret', {
      expiresIn: '1m' // expires in 1 min for dev cycle
    });
    console.log(token)
    res.status(200).send('authentication Successful')
	// } else {
	// 	res.status(400).send('authentication failed')
	// }
})













//TEACHER
app.get('/auth/signedIn', auth.checkSession);
app.post('/auth/login', auth.userLogin);
app.post('/auth/signup', auth.userSignup, teacherdata.getTeacherData);
app.post('/auth/logout', auth.userLogout);
app.post('/teacher/addClass', auth.checkToken, teacherdata.addClass);
app.post('/teacher/addAnswerKey', auth.checkToken, teacherdata.addAnswerKey);
app.post('/teacher/addTest', auth.checkToken, teacherdata.addTest);
app.get('/teacher/getClasses', auth.checkToken, teacherdata.getClasses);
app.get('/teacher/getStudentsforClass', auth.checkToken, teacherdata.getStudentsforClass);
app.get('/teacher/getAllStudents', auth.checkToken, teacherdata.getAllStudents);
//app.get('/teacher/getClass', teacherdata.getClass);

//STUDENT
app.post('/studentauth/signup', auth.studentSignup);
//app.post('/studentauth/login', auth.studentLogin);

app.use(express.static(path.join(__dirname + '/../client/')));

// Handle wildcard route
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/../client/index.html'));
});

module.exports = app;
