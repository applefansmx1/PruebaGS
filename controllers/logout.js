const { invalidateToken } = require('../utils/jwtblacklist');
const express = require('express');
const router = express.Router();

router.post('/', async function (req, res) {
    const token = req.headers['x-token'];
    invalidateToken(token);
    req.session.token = null;
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send({ message: "Error al cerrar sesión" });
        }
        res.status(200).send({ message: "Sesión cerrada con éxito" });
    });
});
module.exports = router;