const cors = require('cors');
const express = require('express');
var router = express.Router();
const session = require('express-session');
require('dotenv').config()

require('./connection')

const logoutController = require('./controllers/logout')
const loginController = require('./controllers/login');
const createController = require('./controllers/create');
const getController = require('./controllers/get');

let server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    name: "session",
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 10 //La sesión caduca en 10 horas
    }
}));

server.use('/login', loginController);
server.use('/logout', logoutController);
server.use('/createUser', createController);
server.use('/getUsers', getController);

router.get('/', function (req, res) {
    res.send('¡Soy el panel de administración!');
});

server.listen(process.env.PORT, () => {
    console.log('Express Server is running.');
});