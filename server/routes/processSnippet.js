const router = require("express").Router();
const {check, validationResult} = require("express-validator");

const CodeSnippet = require("../database/models/CodeSnippet");

const verifyToken = require("./auth/verifyToken");

router.post("/add", verifyToken, [
    check("title").not().isEmpty().isLength({min: 4, max: 256}),
    check("snippet").not().isEmpty().isLength({min: 8}),
    check("description").not().isEmpty().isLength({min: 10}),
], async (req, res)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty())return res.status(401).json({error: errors.errors[0].msg});

        const newSnippet = new CodeSnippet({
            title: req.body.title,
            snippet: req.body.snippet,
            description: req.body.description,
            userID: req.userID,
            timestamp: new Date().toISOString()
        });
        const newSnippetPromise = await newSnippet.save();

        return res.status(200);

    }catch(error){
        return res.status(401).send(error);
    }
});

module.exports = router;