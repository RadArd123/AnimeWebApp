const User = require('../models/user.js');
const bcrypt = require('bcrypt');

async function createUser(userData){
    const { firstName, lastName, email, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = new User({
       firstName,
       lastName,
       email,
       password: hashedPassword,
       role: "client"
    });

    const savedUser = await createdUser.save();
    return savedUser;
}

module.exports = {createUser};