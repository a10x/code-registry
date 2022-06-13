const router = require("express").Router();
const CodeSnippet = require("../database/models/CodeSnippet");
const verifyToken = require("./auth/verifyToken");

router.post("/views", async (req, res)=>{
    try{
        const snippet = await CodeSnippet.findOne({_id: req.body.snipId}, {snippet:0, title:0, timestamp:0, description:0, userID: 0, votes:0});

        snippet.views+=1;

        await CodeSnippet.updateOne({_id: snippet._id}, {views: snippet.views});
    }catch(error){
        console.log(error);
        return res.status(401).send(error);
    }
});

router.post("/votes/", verifyToken, async (req, res)=>{
    try{
        const snippet = await CodeSnippet.findOne({_id: req.body.snipId}, {snippet:0, title:0, timestamp:0, description:0, views:0});

        snippet.votes += req.body.vote;
        
        await CodeSnippet.updateOne({_id: snippet._id}, {votes: snippet.votes});

    }catch(error){
        console.log(error)
        return res.status(401).send(error);
    }
});

module.exports = router;