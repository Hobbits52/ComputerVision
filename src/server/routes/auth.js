'use strict';

const authentication = require('./../middleware/authentication.js')
const route = require('express').Router();

route.get('/signedIn', authentication.checkSession);
route.post('/login', authentication.userLogin);
route.post('/signup', authentication.userSignup);
route.post('/logout', authentication.userLogout);
// student routes do not issue token for API access
route.post('/student/signup', authentication.studentSignup);
route.post('/student/login', authentication.studentLogin);

module.exports = route;