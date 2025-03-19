const bcrypt = require("bcrypt");
const User = require("../models/user");
const {generateToken} = require("../utils/jwtUtils");

async function signin(email, password) {
    const existingUser = await User.findOne({ email }).select('+password');
    if (!existingUser) throw new Error('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) throw new Error('Invalid credentials');

    return generateToken(existingUser);
}

module.exports = {
    signin
}