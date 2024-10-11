const { verifyTokenWithBlacklist } = require('../utils/jwtblacklist');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const usuarios = require('../services/get');
require('dotenv').config()

const verifyToken = async (req, res, next) => {
    const token = req.headers['x-token'];

    if (!token) {
        return res.status(403).send({ message: "No se proporcionó un token!" });
    }
    const verify = await verifyTokenWithBlacklist(token)
    
    if(!verify) return res.status(401).send({ message: "Token no válido" });

    jwt.verify(token, process.env.SECRET_KEY_JWT, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Token no válido" });
        }
        req.userId = decoded.id;
        next();
    });
};

router.get('/', verifyToken, async (req, res) => {
    let loginStatus = await usuarios.getUser();
    res.send(loginStatus);
});

module.exports = router;