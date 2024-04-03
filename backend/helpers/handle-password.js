const bcrypt = require("bcrypt");

const handlePassword = {
    
    encodePassword : async (password) => {
        const salt = await bcrypt.genSalt(12);
        const passwordHashed = await bcrypt.hash(password, salt);
        return passwordHashed;
    },

    decodePassword : async (input, password) => {
        const verifiedPassword = await bcrypt.compare(input, password)
        if(verifiedPassword) return true;
        return false;
    }
}

module.exports = handlePassword;

