const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    ProjectName:{
        type: String,
        required: [true,"Enter Project Name"]
    },
    status:{
        type: Boolean,
       required: true,
    },
    ProjectLeader:{
        type: mongoose.Schema.ObjectId,
        ref:"User",
        required: true
    },
    TeamMembers:[{
        type: mongoose.Schema.ObjectId,
        ref:"User",
        required: true
    }],
})

module.exports = mongoose.model("Project",ProjectSchema);