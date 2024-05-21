const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose'); // import

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var eventRouter = require('./routes/events');
const isAuthorized = require('./middleware/isAuthorized');

require("dotenv").config();

var app = express();


mongoose
  .connect("mongodb+srv://amaral2018:uflTDyDgbXWECP02@cluster0.lhxtim3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {})
  .then(() => {
    console.log("MongoDB conectado, Oba!!!");
  })
  .catch( (err) => {
    console.log("MongoDB não conectado");
    console.log(err);
  });




app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/events', eventRouter);
app.use('/auth', require('./routes/auth'));

app.use(function(req, res, next) {
  next(createError(404));
});


app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

 
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
