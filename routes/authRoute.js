const express = require('express');
const router = express.Router();
const validator = require('validator');
const auth = require('../database/authRepo');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res)=>{
  
    try{
        const {email, password} = req.body ; 

    if(!email || !password){
        return res.status(400).json({
            error : "Both email and password is required"
        });
    }
    const normalisedEmail = email.trim().toLowerCase();


    if(password.length<8){
        return res.status(400).json({
            error : "Password should be at least 8 characters"
        });
    }
    if(!validator.isEmail(normalisedEmail)){
        return res.status(400).json({
            error : "Invalid Email"
        });
    }
    const checkifEmailExists = await auth.findUserByEmail(normalisedEmail);

    if(checkifEmailExists){
        return res.status(409).json({
            error : "Type a unique email id"
        });
    }
    const user = await auth.createUser(normalisedEmail, password);
    res.status(201).json(user)
    }catch(error){
        console.error(error);
        res.status(500).json({
            error : "Internal Server Error"
        });
    }

});

router.post('/login',async (req, res)=>{

    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(401).json({
                error : "Invalid email or password"
            });
        }
        const normalisedEmail = email.trim().toLowerCase();

        if (!validator.isEmail(normalisedEmail)) {
            return res.status(401).json({
                error: "Invalid email or password"
            });
        }

        const user = await auth.findUserByEmail(normalisedEmail);

        if(!user){
            const dummyHash = "1$2a$10$iMv3FmS2eO1u6a3B0n118O4s6.X9vP9r8L2O8t7V3k0h5l11wL7yG"
            await bcrypt.compare(password, dummyHash);
            return res.status(401).json({
                error : "Invalid email or password"
            });
        }
    
        const hashPassword = user.hashedpassword ;

        const isMatched = await bcrypt.compare(password, hashPassword);
    
        if(!isMatched){
            return res.status(401).json({
                error : "Invalid email or password"
            });
        }
        res.status(200).json({
            "status" : "Successfully Logged In "
        });

    }catch(error){
        console.error(error)
        res.status(500).json({
            error : "Internal Server Error"
        });
    }
    
});

module.exports = router ;