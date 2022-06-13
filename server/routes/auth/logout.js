const router = require("express").Router();
const User = require("./../../database/models/User");
const verifyToken = require("./verifyToken");

router.post("/logout", verifyToken, (req, res)=>{
    try{
        req.session.ut = null;
        return res.status(200).json(true);
    }catch(error){
        return res.status(400).json(error);
    }
});

module.exports = router;