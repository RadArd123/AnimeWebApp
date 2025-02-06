const bcrypt = require("bcrypt");
const User = require("../models/user");
const {generateToken} = require("../utils/jwtUtils");

async function signin(email, password){
    try{
       const existingUser = await User.findOne({email})
       if(!existingUser){
         throw new Error("User not found");
       }
       const isPasswordValid = await bcrypt.compare(password, existingUser.password);
       if(!isPasswordValid){
        throw new Error("Try an other password");
       }
       const token = generateToken(existingUser);
       return token;
    }catch(error){
        console.log(error.message);
        throw new Error("Invalid credentials")
    }
}

module.exports = {
    signin
}