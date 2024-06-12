const mongoose = require("mongoose");


const EsquemaUsuario = new mongoose.Schema({
    nome: {type: String, required: true},
    email: {type: String, required: true},
    passsenhaword: {type: String, required: true},
    dataNascimento: {type: Date, required: false },
    dataCriacao: {type: Date, default: Date.now },
    dataAlteracao: {type: Date, default: Date.now }
});

module.exports = mongoose.model('Usuario', EsquemaUsuario, 'usuario');