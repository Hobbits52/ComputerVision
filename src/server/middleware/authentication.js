const teacherDBController = require('./../../../db/teacher/teacherController.js');
const studentDBController = require('./../../../db/student/studentController.js');
const jwt = require('jsonwebtoken');
const Cache = require('./../utility/cacheData.js');

//////////////////////////////////////////////////////////////////
//TOKEN SPECIFIC FUNCTIONS
//////////////////////////////////////////////////////////////////
const checkToken = function(req, res, next) {
  console.log('checkToken called', req.query.token);
  // check header for token --> our client will be in query string of GET request
  var token = req.query.token || req.headers['x-access-token'] || req.body.token
  if (token) {
   // verifies secret and checks exp
    jwt.verify(token, 'secret', function(err, decoded) {
      if (err) {
        return res.status(403).send({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
  };
};

const createToken = function(req, res, user, usertype) {
  //express token based authentication instead of session
  var token = jwt.sign({key: 'sample', user: usertype}, 'secret', {
    expiresIn: '5m' // expires in 1 min for dev cycle
  });
  res.status(200).send({token: token, user: user});
  //send token as well as user object containing
  //{id: id, username: username}
};


//////////////////////////////////////////////////////////////////
//TEACHER LOGIN FUNCTIONS
//////////////////////////////////////////////////////////////////

const teacherLogin = function(req, res) {
  teacherDBController.Login(req.body, function(err, teacher) {
    if (err) {
      console.log('Login Error: ', err);
      res.status(401).send(err);
      res.end();
  	} else {
      //teacher: {id: id, username: username}
      createToken(req, res, teacher, 'teacher');
      Cache.saveTeacherData(teacher.id);
  	}
  });
};

const teacherSignup = function(req, res, next) {
  teacherDBController.Signup(req.body, function(err, teacher) {
    if (err) {
      res.status(400).send(err);
      res.end();
    } else {
      //changed from Session to Token
      createToken(req, res, teacher, 'teacher');
    }
  });
};



// DEV TO DO: Change from session to token
const teacherLogout = function(req, res) {  
  req.session.destroy(function() {
    res.status(200);
    res.end();
  })
};

//////////////////////////////////////////////////////////////////
//STUDENT
//////////////////////////////////////////////////////////////////
// IMPORTANT: studentLogin should NEVER issue token
const studentLogin = function(req, res) {
  studentDBController.studentLogin(req.body, function(err, student) {
    if (err) {
      res.status(401).send(err);
      res.end();
    } else {
      createToken(req, res, student, 'student');
    }
  });
};

// IMPORTANT: studentLogin should NEVER issue token
const studentSignup = function(req, res) {
  studentDBController.studentSignup(req.body, function(err, student) {
    if (err) {
      res.status(400).send(err);
      res.end();
    } else {
      createToken(req, res, student, 'student');
    }
  });
};

module.exports = {
  'teacherLogin' : teacherLogin,
  'teacherSignup' : teacherSignup,
  'studentLogin' : studentLogin,
  'studentSignup' : studentSignup,
  'teacherLogout' : teacherLogout,
  'checkToken': checkToken
};
