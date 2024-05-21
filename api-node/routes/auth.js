
const express = require('express');
const router = express.Router();
const User = require('../model/User');
const jwt = require("jsonwebtoken");

const timeout = 3600;


const generateToken = (params = {}, timeout = 3600) => {
    return jwt.sign(params, process.env.JWT_SECRET, { expiresIn: timeout });
}


router.post("/", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });


    if(!user) 
        return res.status(400).json({ message: "Credenciais inválidas "});

    const now = new Date();

    const resposta = {
        token: generateToken( { id: user.id }),
        user,
        loggedId: now,
        expiresIn: new Date(now.getTime() + timeout * 1000)
    }


    return res.json(resposta);
})


module.exports = router;