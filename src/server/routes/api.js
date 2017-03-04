'use strict';

const authentication = require('./../middleware/authentication.js')
const api = {get: require('./../middleware/teacherGetHelper.js'),
						 post: require('./../middleware/teacherPostHelper.js')};

const route = require('express').Router();

route.use(authentication.checkToken);

route.post('/addClass', api.post.Class);
route.post('/addAnswerKey', api.post.AnswerKey);
route.post('/addTest', api.post.Test);
route.get('/getClasses', api.get.Classes);
route.get('/getStudentsByClass', api.get.StudentsByClass);
route.get('/getTestsForClass', api.get.TestsForClass);
route.get('/getKeysForClass', api.get.KeysForClass);

module.exports = route;