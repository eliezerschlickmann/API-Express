const express = require('express');
const rota = express.Router();
const Evento = require('../Modelo/Evento');
const Autorizacao = require('../MiddleWare/Autorizacao');

rota.get("/", async function(req, res) {
    return res.json(await Evento.find());
});

rota.get("/:id", async (req, res) => {
    const {id} = req.params;

    const resultado = await Evento.findById(id);
    return resultado
        ? res.json(resultado)
        : res.status(404).send();

});

rota.post("/", async (req, res) => {
    const json = req.body;
    const evento = new Evento(json);
    const hasErrors = evento.validateSync();

    return hasErrors
        ? res.status(400).json(hasErrors)
        : res.status(201).json(await evento.save());
});

module.exports = rota;

