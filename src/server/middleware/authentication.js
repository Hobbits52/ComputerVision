const teacherController = require('./../../../db/teacher/teacherController.js');
const studentController = require('./../../../db/student/studentController.js');

const checkSession = function(req, res, next) {
  const isLoggedIn = req.session ? !!req.session.user : false;
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

const createSession = function(req, res, user) {
  return req.session.regenerate(function() {
      req.session.user = user;
  })
};


//////////////////////////////////////////////////////////////////
//TEACHER
//////////////////////////////////////////////////////////////////
const userLogin = function(req, res, next) {
  teacherController.teacherLogin(req.body, function(err, user) {
    if (err) {
      res.status(401).send(err);
      res.end();
  	} else {
  	  createSession(req, res, user);
  	  next();
  	}
  });
};

const userSignup = function(req, res, next) {
  teacherController.teacherSignup(req.body, function(err, user) {
    if (err) {
      res.status(400).send(err);
      res.end();
    } else {
      createSession(req, res, user);
      next();
    }
  });
};

// const userLogout = function(req, res) {
//   req.session
// };

//////////////////////////////////////////////////////////////////
//STUDENT
//////////////////////////////////////////////////////////////////
const studentLogin = function(req, res, next) {
  studentController.teacherLogin(req.body, function(err, user) {
    if (err) {
      res.status(401).send(err);
      res.end();
    } else {
      createSession(req, res, user);
      next();
    }
  });
};

const studentSignup = function(req, res, next) {
  studentController.teacherSignup(req.body, function(err, user) {
    if (err) {
      res.status(400).send(err);
      res.end();
    } else {
      createSession(req, res, user);
      next();
    }
  });
};

module.exports = {
  'checkSession': checkSession,
  'userLogin' : userLogin,
  'userSignup' : userSignup/*,
  'userLogout' : userLogout*/
};
