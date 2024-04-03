const jwtToken = require("jsonwebtoken");
require("dotenv").config();


const checkToken = (req, res, next) => {
    const secret = process.env.JWT_SECRET;
    const token = req.header("auth-token");

    if(!token){
        res.status(401).json({error: "Access denied!"});
    };
    
    try {
        const verifiedToken = jwtToken.verify(token, secret);
        req.user = verifiedToken;
        next();
        
    } catch (error) {
        res.status(400).json({error: "Invalid token."})
    };    
}
module.exports = checkToken;