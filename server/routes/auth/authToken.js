const router = require("express").Router();

const jwt = require("jsonwebtoken");

const verifyToken = require("./verifyToken");

const User = require("./../../database/models/User");

router.post("/authUser", verifyToken,
    async (req, res)=>{
        let user = await User.findOne({_id: req.userID});


        return res.status(200).json({valid: true, username: user.username});
    }
);

module.exports = router;