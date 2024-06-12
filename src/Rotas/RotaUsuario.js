const express = require('express');
const rota = express.Router();
const Usuario = require('../Modelo/Usuario');
const Autorizacao = require('../MiddleWare/Autorizacao');


rota.get("/", [Autorizacao], async function(req, res) {
  return  res.json(await Usuario.find());
});

rota.get("/:id", Autorizacao, async (req, res) => {
  const {id} = req.params;

  const result = await Usuario.findById(id)
  return result 
    ? res.json(result)
    : res.status(404).send();
});


rota.post("/", async (req, res) => {
  const json = req.body;

  const usuario = new Usuario(json);

  const hasErrors = usuario.validateSync();

  return hasErrors
    ? res.status(400).json(hasErrors)
    : res.status(201).json(await usuario.save());
});


rota.put("/:id", Autorizacao, (req,res)=>{

});

rota.delete("/:id", Autorizacao, (req,res)=>{

});


module.exports = rota;