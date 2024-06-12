const jwt = require("jsonwebtoken");

const Autorizacao = (req, res, next) => {

    const { autorizacao } = req.headers;

    if(!autorizacao) 
        return res.status(403).json({message: "Sem token"});


    jwt.verify(autorizacao, process.env.JWT_SECRET, (err, decoded) => {
        console.log(decoded);
        

        if(err) return res.status(401).json({ message: "Token inválido"});

        req.userId = decoded.id;
        return next(); 
    });
};

module.exports = Autorizacao;