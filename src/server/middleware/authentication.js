<<<<<<< HEAD
const teacherController = require('./../../../db/teacher/teacherController.js');

=======
>>>>>>> (dev) Created basic server and express-session
const checkSession = function(req, res) {
  const isLoggedIn = req.session ? !!req.session.user : false;
  if (!isLoggedIn) {
  	res.status(401);
  	res.end();
  } else {
  	res.status(200);
  	res.end();
  }
};

<<<<<<< HEAD
const createSession = function(req, res, user) {
  return req.session.regenerate(function() {
  	req.session.user = user;
  })
}

const userLogin = function(req, res) {
  teacherController.teacherLogin(req.body, function(err, user) {
    if (err) {
      res.status(401).send(err);
      res.end();
  	} else {
  	  createSession(req, res, user);
  	  res.status(200).send(user);
  	  res.end();
  	}
  });
};

module.exports = {
  'checkSession': checkSession,
  'userLogin' : userLogin
=======
module.exports = {
  'checkSession': checkSession
>>>>>>> (dev) Created basic server and express-session
};