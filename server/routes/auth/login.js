const router = require("express").Router();
const {check, validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const User = require("./../../database/models/User");

router.post("/login",
    [
        check("username").not().isEmpty().isLength({min: 2, max: 32}),
        check("password").not().isEmpty().isLength({min: 5, max: 32})
    ], 
    async (req, res)=>{
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty())return res.status(401).json({error: errors.errors[0].msg});

            let oldUser = await User.findOne({username: req.body.username});
            if(!oldUser)return res.status(401).json({error: "User doesn't exist"});
            
            let passwordMatch = await bcryptjs.compare(req.body.password, oldUser.password);
            if(!passwordMatch)return res.status(401).json({error: "Password doesn't match"});
            

            jwt.sign({id: oldUser._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRY},(error, token)=>{
                if(error)throw error;

                req.session.ut = token;
                return res.status(200).json({user: oldUser.username, exp: jwt.decode(token).exp});
            });

        }catch(error){
            return res.status(400).send(error);
        }
});

module.exports = router;