const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        min: 2,
        max: 32
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
        min: 5,
        max: 32
    },
    dateRegistered:{
        type: Number,
        required: false
    }
});

module.exports = mongoose.model("User", UserSchema);