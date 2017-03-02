const express = require('express');
const session = require('express-session');
const jwt    = require('jsonwebtoken')
const authMiddleware = require('./middleware/authentication.js');
const teacherPosts = require('./middleware/teacherPostHelper.js');
const teacherGets = require('./middleware/teacherGetHelper.js');
const path = require('path');
const bodyParser = require('body-parser');
const authRouter = require('./routes/auth.js');
const apiRouter = require('./routes/api.js');

const app = express();

// DEV: uncomment 'morgan' for development
app.use(require('morgan')('dev'));

app.use(bodyParser.json());


// routes
app.use('/auth', authRouter);
app.use('/api', apiRouter);

app.use(express.static(path.join(__dirname + '/../client/')));

// Handle wildcard route
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/../client/index.html'));
});

module.exports = app;