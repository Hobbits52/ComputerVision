const teacherController = require('./../../../db/teacher/teacherController.js');
const studentController = require('./../../../db/student/studentController.js');
const jwt    = require('jsonwebtoken')

const checkSession = function(req, res, next) {
  const isLoggedIn = req.session ? !!req.session.user : false;
  console.log('req.session.user: ', req.session.user);
  if (!isLoggedIn) {
      res.status(401);
      res.end();
  } else {
      if(next) {
        next();
      } else {
        res.status(200);
        res.end();
      }
  }
};

const checkToken = function(req, res, next) {
  console.log('checkToken called');
  // console.log(req.headers)
  console.log(req.body.token)
  console.log(req.headers['x-access-token'])
  console.log(req.query.token)
  // check header for token --> our client will be in query string of GET request
  var token = req.query.token || req.headers['x-access-token'] || req.body.token
  if (token) {
   // verifies secret and checks exp
    console.log('token provided =====> ', token)
    jwt.verify(token, 'secret', function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
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






const createSession = function(req, res, user) {
  return req.session.regenerate(function() {
    req.session.user = user;
  })
};

const createToken = function(req, res) {
  console.log('createToken called')
  var token = jwt.sign({key: 'sample'}, 'secret', {
      expiresIn: '1m' // expires in 1 min for dev cycle
  });
  console.log('Token created ------------------------------------------')
  console.log(token)
  res.status(200).send({token: token})
}


//////////////////////////////////////////////////////////////////
//TEACHER
//////////////////////////////////////////////////////////////////
const userLogin = function(req, res) {
  console.log('userLogin called -------------------->')
  console.log(req.body)
  teacherController.teacherLogin(req.body, function(err, user) {
    if (err) {
      console.log('Login Error: ', err);
      res.status(401).send(err);
      res.end();
  	} else {
      // changed from Session to Token
  	  // res.status(200).send('helloworld')
      createToken(req, res);
  	}
  });
};



const userSignup = function(req, res, next) {
  teacherController.teacherSignup(req.body, function(err, user) {
    if (err) {
      res.status(400).send(err);
      res.end();
    } else {
      //changed from Session to Token
      createToken(req, res);
      next();
    }
  });
};



// DEV TO DO: Change from session to token
const userLogout = function(req, res) {  
  req.session.destroy(function() {
    res.status(200);
    res.end();
  })
};

//////////////////////////////////////////////////////////////////
//STUDENT
//////////////////////////////////////////////////////////////////
const studentLogin = function(req, res) {
  studentController.studentLogin(req.body, function(err, user) {
    if (err) {
      res.status(401).send(err);
      res.end();
    } else {
      createSession(req, res, user);
      res.status(200);
      res.end();
    }
  });
};

const studentSignup = function(req, res) {
  studentController.studentSignup(req.body, function(err, user) {
    if (err) {
      res.status(400).send(err);
      res.end();
    } else {
      createSession(req, res, user);
      res.status(200);
      res.end();
    }
  });
};

module.exports = {
  'checkSession': checkSession,
  'userLogin' : userLogin,
  'userSignup' : userSignup,
  'studentLogin:' : studentLogin,
  'studentSignup' : studentSignup,
  'userLogout' : userLogout,
  'checkToken': checkToken
};
