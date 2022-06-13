const mongoose = require("mongoose");

const connectToDatabase = () =>{
    mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true},()=>{
        console.log("Connected to database");
    });
}

exports.connectToDatabase = connectToDatabase;


