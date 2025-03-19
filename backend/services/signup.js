const User = require('../models/user.js');
const bcrypt = require('bcrypt');

async function createUser(userData){
    const { username, email, password } = userData;

    const existingUsername = await User.findOne({username});
    const existingEmail = await User.findOne({email});

    if(existingUsername || existingEmail){
        throw new Error("Username or email already exists");
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(userData.password)) {
        throw new Error('Password must contain at least 8 characters, one uppercase, one lowercase and  one number');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = new User({
       username,
       email,
       password: hashedPassword,
       role: "client"
    });

    const savedUser = await createdUser.save();
    // Remove password from the user object
    const userToReturn = savedUser.toObject();
    delete userToReturn.password;

    return userToReturn;
}

module.exports = {createUser};