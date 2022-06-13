const router = require("express").Router();

const CodeSnippet = require("../database/models/CodeSnippet");
const User = require("../database/models/User")

router.get("/get", async(req, res)=>{

    try{
        const snippets = await CodeSnippet.aggregate([
            {$limit: 10},
            {
                $lookup: {
                    from: "users",
                    localField: "userID",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $project:{
                    "user._id": 0,
                    "user.password": 0,
                    "user.email": 0,
                    "user.dateRegistered": 0,
                    snippet: 0
                }
            },
            {
                $sort: {
                    _id: -1
                }
            }
        ]);
        return res.json({data: snippets});
    }catch(error){
        return res.status(401).send(error);
    }
})

router.get("/get/:snipId", async(req, res)=>{
    try{
        const snippet = await CodeSnippet.findOne({_id: req.params.snipId});
        const user = await User.findOne({_id: snippet.userID}, {email: 0, password: 0, _id: 0, dateRegistered: 0});

        const username = user.username;
        return res.json({snippet, username});
    }catch(error){
        return res.status(401).send(error);
    }
})

module.exports = router;