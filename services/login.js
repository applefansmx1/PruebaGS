const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports.login = async (body) => {
    const user = body.user
    const pass = body.password
    const regex = /^\d{10}$/;
    let userData
    if(!user || !pass){
        return {
            "status":"Falta usuario o contraseña"
        };
    }
    let response = {};
    if (regex.test(user))  {
        userData = await User.findOne({phone:user})
    }else{
        userData = await User.findOne({username:user})
    }
    if(userData===null){
        response.status = false
        return response;
    }

    const passhash = bcrypt.compareSync(pass,userData.password);    

    if(passhash){
        const secretKey = process.env.SECRET_KEY_JWT;
        const options = {
            expiresIn: '1h' // El token expirará en 1 hora
        }
        const token = jwt.sign(body, secretKey, options);
        response.data = userData;
        response.status = true;
        response.token = token
    }
    if (!response.status) {
        response.status = false
        return response;
    } else {
        return response;
    }    

    
};

