const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

var index = require('./Rotas/Index');
var usuariosRotas = require('./Rotas/RotaUsuario');
var eventosRotas = require('./Rotas/RotaEvento');
const autorizacao = require('./MiddleWare/Autorizacao');

require("dotenv").config();

var app = express();


mongoose
  .connect("mongodb+srv://eliezer0150link:6FwRlVWDnICoLoi3@cluster0.2350xrd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {})
  .then(() => {
    console.log("MongoDB conectado ahh caceta");
  })
  .catch( (err) => {
    console.log("MongoDB deu pau!!!");
    console.log(err);
  });




app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);
app.use('/RotaUsuario', usuariosRotas);
app.use('/RotaEvento', eventosRotas);
app.use('/RotaAutor', require('./Rotas/RotaAutor'));

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