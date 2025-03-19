const userService = require('../services/signup');

async function createUser(req, res){
    try{
        const userData = req.body;
        const user = await userService.createUser(userData);
        res.status(201).json({user: user, message: "User created successfully"});
    }catch(error){
        console.log(error);
        
        if(error.message.includes("already exists")){
            res.status(409).json({message: error.message});
        } else if (error.message.includes("validation failed")){
            res.status(400).json({message: error.message});
        }else if (error.message.includes("Password")){
            res.status(400).json({message: error.message});
        }else {
            res.status(500).json("Internal server error");
        }
    }
}   

module.exports = {createUser};