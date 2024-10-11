const express = require('express');
const router = express.Router();
const usuarios = require('../services/login');

router.post('/', async function (req, res) {
    let loginStatus = await usuarios.login(req.body);
    if (loginStatus.status === true) {
        req.session.token = loginStatus.token;
        res.send(loginStatus);
    } else {
        res.send('Login failed');
    }
});
module.exports = router;