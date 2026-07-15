const express = require('express');
const router = express.Router();
const validator = require('validator');
const auth = require('../database/authRepo');

router.post('/register', async (req, res)=>{
  
    try{
        const {email, password} = req.body ;
        const normalisedEmail = email.trim().toLowerCase();
 

    if(!normalisedEmail || !password){
        return res.status(400).json({
            error : "Both email and password is required"
        });
    }
    if(password.length<8){
        return res.status(400).json({
            error : "Password should be at least 8 characters"
        });
    }
    if(!validator.isEmail(email)){
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

module.exports = router ;