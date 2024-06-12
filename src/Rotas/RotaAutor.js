
const express = require('express');
const rota = express.Router();
const Usuario = require('../Modelo/Usuario');
const jwt = require("jsonwebtoken");

const timeout = 3600;


const generateToken = (params = {}, timeout = 3600) => {
    return jwt.sign(params, process.env.JWT_SECRET, { expiresIn: timeout });
}


rota.post("/", async (req, res) => {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ email, senha });


    if(!usuario) 
        return res.status(400).json({ message: "Credenciais inválidas "});

    const now = new Date();

    const resposta = {
        token: generateToken( { id: usario.id }),
        usuario,
        loggedId: now,
        expiresIn: new Date(now.getTime() + timeout * 1000)
    }


    return res.json(resposta);
})


module.exports = rota;