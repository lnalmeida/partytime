const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const handlePassword = require("../helpers/handle-password");
require("dotenv").config();

const User = require("../models/user");

const secret = process.env.JWT_SECRET;

// register a new user
router.post("/register", async (req, res) => {

    const {name, email, password, confirmPassword} = req.body;
    //checking for required fields
    if(name == null || email == null || password == null || confirmPassword == null) {
        return res.json({ error: "All fields are required!"});
    };
    //checking if passwords match
    if(password != confirmPassword){
        return res.status(400).json({error: "Passwords don't match."})
    }
    //checing if user exists
    const emailExists = await User.findOne({email: email});
    if(emailExists) {
        return res.status(400).json({error: "E-mail already in use!."});
    }
    //create password
    const passwordHash = await handlePassword.encodePassword(password);


    //registering a new user in Mongo
    const user = new User({
        name,
        email,
        password: passwordHash
    });

    try {
        const newUser = await user.save();

        //create token
        const token = jwt.sign(
            //payload
            {
                name: newUser.name,
                id: newUser._id
            }, 
            secret
        );
        //return token
        res.status(201).json({error: null, message: "Registration successfully complete!!", token: token, userId: newUser._id});

    } catch (error) {
        res.status(400).json({error: error});
    };

});

router.post("/login", async (req, res) => {
    try {
        
        const {email, password} = req.body;
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(404).json({error: "There is no registered user with this email."});
        };

        if(password == null) {
            return res.status(400).json({error: "Password is required!"});
        }
    
        const verifiedPassword = await handlePassword.decodePassword(password, user.password);
    
        if(!verifiedPassword) {
            return res.status(400).json({error: "The password is incorrect."});
        };
        //create token
        const token = jwt.sign(
            //payload
            {
                email: user.email,
                id: user._id
            }, 
            secret
        );
        //return token
        res.status(200).json({error: null, message: "You are now authenticatedd!!", token: token, userId: user._id});
    } catch (error) {
        res.status(400).json({error: error});
    };
})

module.exports = router;