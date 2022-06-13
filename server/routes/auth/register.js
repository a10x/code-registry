const router = require("express").Router();
const {check, validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const User = require("./../../database/models/User");

router.post("/register", 
    [
        check("username", "Username is invalid").not().isEmpty().isLength({min: 2, max: 32}),
        check("email", "Email is invalid").isEmail(),
        check("password", "Password is invalid").not().isEmpty().isLength({min: 5, max: 32})
    ],
    async (req, res)=>{
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty())return res.status(401).json({error: errors.errors[0].msg});

            let userExists = await User.findOne({username: req.body.username});
            if(userExists)return res.status(401).json({error: "Username already taken"});

            userExists = await User.findOne({email: req.body.email});
            if(userExists)return res.status(401).json({error: "Email already taken"});

            const salt = await bcryptjs.genSalt(10);
            let password = req.body.password;

            password = await bcryptjs.hash(password, salt);

            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: password,
                dateRegistered: req.body.dateRegistered});

            await newUser.save();

            jwt.sign({id:newUser._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRY}, (error, token)=>{
                if(error)throw error;
                
                req.session.ut = token;
                return res.status(200).json({user: newUser.username, exp: jwt.decode(token).exp});
            });

        }catch(error){
            return res.status(400).send(error);
        }
    }
);

module.exports = router;