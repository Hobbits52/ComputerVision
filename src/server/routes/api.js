'use strict';

const authentication = require('./../middleware/authentication.js')
const api = require('./../middleware/teacherdatafetcher.js');
const route = require('express').Router();

route.use(authentication.checkToken);

route.post('/addClass', api.addClass);
route.post('/addAnswerKey', api.addAnswerKey);
route.post('/addTest', api.addTest);
route.get('/getClasses', api.getClasses);
route.get('/getStudentsforClass', api.getStudentsforClass);
route.get('/getAllStudents', api.getAllStudents);

module.exports = route;