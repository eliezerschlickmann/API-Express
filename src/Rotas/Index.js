var express = require('express');
var rota = express.Router();


rota.get('/', function(req, res, next) {
  res.render('Index', { title: 'Express' });
});

module.exports = rota;
