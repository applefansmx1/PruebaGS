const express = require('express');
const router = express.Router();
const usuarios = require('../services/create');

router.post('/', async function  (req, res) {
    let loginStatus = await usuarios.createUser(req.body);
    res.send(loginStatus);
});
module.exports = router;