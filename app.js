var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const middleware =require('./Middleware/jwt.middleware');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let studentRouter= require('./routes/student.routes')
let loginRouter=require('./routes/auth');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user',loginRouter);

app.use('/',middleware.checkToken, indexRouter);
app.use('/users',middleware.checkToken, usersRouter);
app.use('/student',middleware.checkToken,studentRouter);


module.exports = app;
