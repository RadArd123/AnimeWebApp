const mongoose = require('../configuration/dbConfig.js'); 

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    role:{type: String, enum: ["admin", "client"], default: "client"},
})

module.exports = mongoose.model('User', userSchema);