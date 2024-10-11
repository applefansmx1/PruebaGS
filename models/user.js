const {Schema, model} = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema= new Schema({
    name:String,
    last_name_P:String,
    last_name_M:String,
    phone:String,
    email:String,
    username:String,
    password:String
    
});

userSchema.methods.generateHash = function (pass) {
    return bcrypt.hashSync(pass,bcrypt.genSaltSync(8),null);
}

module.exports = model('User', userSchema)