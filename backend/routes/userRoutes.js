const router = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../models/user");

//middlewares
const verifyToken = require("../helpers/verify-token");
const handlePassword = require("../helpers/handle-password");
const getUserByToken = require("../helpers/get-user-by-token");

//get an user
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({error: null, users: users});
    } catch (error) {
        return res.status(404).json({error: "There are no registered users at this time."})
    };
});

//get a user by ID
router.get("/:id", verifyToken, async (req, res) => {
    try {
        const userId = req.params.id;
        const userById = await User.findOne({_id: userId}, {password: 0, __v: 0});
        return res.status(200).json({error: null, userById});
    } catch (error) {
        return res.status(404).json({error: "User not found."})
    };
});


//update a user
router.put("/", verifyToken, async (req, res) => {
    try {
        const token = req.header("auth-token");
        const user = await getUserByToken(token);
        const {userReqId, name, email, password, confirmPassword} = req.body;

        const userId = user._id.toString();

        if(userId != userReqId){
            return res.status(401).json({error: "Access denied!"});
        }

        const userToUpdate = {
             name,
             email,
        };

        if(password != confirmPassword) {
            return res.status(400).json({error: "Passwords don't match."});
        } else if(password == confirmPassword && password != null) {
            const hashedPassword = await  handlePassword.encodePassword(password);
            userToUpdate.password = hashedPassword;
        }

        const updatedUser = await User.findOneAndUpdate({_id: userId}, {$set: userToUpdate}, {new: true});

        return res.status(200).json({error: null, updatedUser});

    } catch (error) {
        return res.status(404).json({error: "User not found."})
    };
});

module.exports = router;