const mongoose = require("mongoose")

const ActivitySchema = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    TicketId: {
        type: mongoose.Schema.ObjectId,
        ref: "Ticket",
        required: true
    },
    ProjectId: {
        type: mongoose.Schema.ObjectId,
        ref: "Project",
        required: true,
    },
    actionType: {
        type: String,
        enum: ["create", "update", "comment", "assign", "status_change", "priority_change", "attachment"],
    },
    oldValue:{
        type: String,
    },
    newValue:{
        type: String
    },
    message: String,
    LoggedTime: {
        default: Date.now,
        type: Date,
    }
})

module.exports = mongoose.model("ActivityLog", ActivitySchema);