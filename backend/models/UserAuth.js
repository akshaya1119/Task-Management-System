const mongoose = require("mongoose");

const UserAuthSchema = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    AutogenPass :{
        type : Boolean,
        default: false
    }
})

mongoose.exports = mongoose.models("UserAuth",UserAuthSchema)