const router = require("express").Router();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const _ = require("lodash");

const Party = require("../models/party");
const User = require("../models/user");

//middlewares
const verifyToken = require("../helpers/verify-token");

//helpers
const getUserByToken = require("../helpers/get-user-by-token");

//file storage settings
const s3FileStorage = require("../helpers/s3-file-storage");
const upload = multer({ storage: s3FileStorage });

//routes
//get all public parties
router.get("/all", async (req, res) => {
    try {
        const parties = await Party.find({isPrivate: false }, {__v:0}).sort({_id: -1});
        if(parties.length == 0) {
            return res.status(404).json({error: "There are no registered parties at this time."});
        }
        return res.status(200).json({error: null, parties: parties});
    } catch (error) {
        return res.status(500).json({error: "Error on get parties. Error: " + error});
    }
});

//get all parties by user id
router.get("/:userId/all", verifyToken, async (req, res) => {
    try {
        const token = req.header("auth-token");
        const user = await getUserByToken(token);
        console.log(user);
        if(!token || !user) return res.status(401).json({error: "Access denied!"});
        const partyUserId = user._id.toString();
        const partyByUserId = await Party.find({userId: partyUserId}, {__v: 0}). sort({partyDate: 1});
        return res.status(200).json({error: null, partyByUserId});
    } catch (error) {
        return res.status(404).json({error: "There are no registered parties to this user at this time."});
    }
});

//get public parties by user id
router.get("/:userId/public", verifyToken, async (req, res) => {
    try {
        const token = req.header("auth-token");
        const user = await getUserByToken(token);
        console.log(user);
        if(!token || !user) return res.status(401).json({error: "Access denied!"});
        const publicPartyUserId = user._id.toString();
        const publicPartyByUserId = await Party.find({userId: publicPartyUserId, isPrivate: false}, {__v: 0}). sort({partyDate: 1});
        return res.status(200).json({error: null, publicPartyByUserId});
    } catch (error) {
        return res.status(404).json({error: "There are no public parties at this time."});
    }
});

//get private parties by user id
router.get("/:userId/private", verifyToken, async (req, res) => {
    try {
        const token = req.header("auth-token");
        const user = await getUserByToken(token);
        console.log(user);
        if(!token || !user) return res.status(401).json({error: "Access denied!"});
        const privatePartyUserId = user._id.toString();
        const privatePartyByUserId = await Party.find({userId: partyUserId, isPrivate: true}, {__v: 0}). sort({partyDate: -1});
        return res.status(200).json({error: null, privatePartyByUserId});
    } catch (error) {
        return res.status(404).json({error: "There are no private parties at this time.."});
    }
});


//create a new party
router.post("/", verifyToken, upload.any("photos"), async (req, res) => {
    try {
        const token = req.header("auth-token");
        const user = await getUserByToken(token);
        if(!token || !user) return res.status(401).json({error: "access denied!"});

        const {title, description, party_date, is_private} = req.body;
        console.log(title, description, party_date)

        //validations
        if(_.isEmpty(title)  || _.isEmpty(description)  ||  party_date.length === 0){
            return res.status(400).json({error: "Title, Description and Party Date are required."});
        };
        console.log(req.files)

        let files = [];

        if(req.files) {
            files = req.files;
        };




        //create photos array image uri
        let photos = [];
        if(files && files.length > 0) {
            files.forEach((photo, i) => {
                if(photo && photo.location){
                    photos[i] = photo.location;
                }
            });
        };


        const party = new Party( {
            title, 
            description, 
            partyDate: party_date,
            photos: photos, 
            isPrivate: is_private, 
            userId : user._id.toString()
        });

        const newParty = await party.save();
        res.status(201).json({error: null, message: "Party registered successfully!!", newParty});
    } catch (error) {
        if(error && error.errors.partyDate) {
            return res.status(400).json({error: "Title, Description and Party Date are required."});
        };
        res.status(400).json({error: error});
    };
});

//update a party
router.put("/:id", verifyToken, async (req, res) => {
    try {
        const token = req.header("auth-token");
        const user = await getUserByToken(token);
        const reqPartyId = req.params.id;
        if(!token || !user) return res.status(401).json({error: "Access denied!"});
    
        const {title, description, party_date} = req.body;
    
        let files = [];
    
        if(req.files) {
            files = req.files.photos;
        };
        
        //validations
        if(title == null || description == null || party_date == null){
            return res.status(400).json({error: "Title, Description and Party Dater are required."});
        };
    
        //create photos array image uri
        let photos = [];
        if(files && files.length > 0) {
            files.forEach((photo, i) => {
                photos[i] = photo.path;
            });
        };
    
        const partyToUpdate = {
            title, 
            description, 
            party_date, 
            photos, 
            isPrivate: req.body.isPrivate, 
            userId : user._id.toString()
        };
    
        const updatedPArty = await Party.findOneAndUpdate({_id: reqPartyId }, {$set: partyToUpdate}, {new: true});

        return res.status(200).json({error: null, updatedPArty});
        
    } catch (error) {
        return res.status(404).json({error: "Party not found."})
    }    

});





//delete a party
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const token = req.header("auth-token");
        const user = await getUserByToken(token);
        const reqPartyId = req.params.id;
        if(!token || !user) return res.status(401).json({error: "Access denied!"});
    
        await Party.findOneAndDelete({_id: reqPartyId});
        return res.status(204);
    } catch (error) {
        res.status(500).json({error: "An error occurred during party deletion."})
    };
});

module.exports = router;