const authService = require("../services/signin");

async function signin(req,res){
    try{
        const {email, password} = req.body;
        const token = await authService.signin(email, password);
        res.json({token: token});
    }catch(error){
        res.status(401).json({ message: "Invalid credentials"});

    }
}

module.exports = {
    signin
}