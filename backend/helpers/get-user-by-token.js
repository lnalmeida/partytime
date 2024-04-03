const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/user");

const getUserByToken = async (token) => {
    const secret= process.env.JWT_SECRET;
    if(!token){
        res.status(401).json({error: "Access denied!"});
    };

    const decoded = jwt.verify(token, secret);

    const userId = decoded.id;

    const user = await User.findOne({_id: userId});

    return user;
}

module.exports = getUserByToken;