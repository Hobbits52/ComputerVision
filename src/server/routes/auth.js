const authentication = require('./../middleware/authentication.js')
const route = require('express').Router();

route.post('/login', authentication.teacherLogin);
route.post('/signup', authentication.teacherSignup);
route.post('/logout', authentication.teacherLogout);
// student routes do not issue token for API access
route.post('/student/signup', authentication.studentSignup);
route.post('/student/login', authentication.studentLogin);

module.exports = route;