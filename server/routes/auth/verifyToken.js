const jwt = require("jsonwebtoken");

const validateSession = (req) =>{
    if(req.session.ut)return true;
    return false;
}

const verifyToken = (req, res, next)=>{
    const jwtToken = req.session.ut;

    try{
        if(!jwtToken)throw "Invalid Token";
        const tokenDecoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
        req.userID = tokenDecoded.id;
        next();
    }catch(error){
        return res.status(401).json({error});
    }
}



module.exports = verifyToken;