const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type: {
        type: String,
        enum: ["mention", "assignment", "comment", "status-change", "general"],
        required: true
    },
    message:{
        type:String,
        required:true
    },
    CreatedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    TicketId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket",
        required: true
    },
    CommentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        required: true
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    CreatedAt:{
        type: Date,
        default: Date.now(),
    }
})