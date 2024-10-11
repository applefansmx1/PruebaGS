const User = require('../models/user')

module.exports.getUser = async () => {
    const users = await User.find()
    return(users)
};

