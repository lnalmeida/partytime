const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

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
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

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
            "mySecretKey"
        );
        //return token
        res.json({error: null, message: "Registration successfully complete!!", token: token, userId: newUser._id});

    } catch (error) {
        res.status(400).json({error: error});
    }


});

module.exports = router;