const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    ticketId: {
        type: mongoose.Schema.ObjectId,
        ref: "Ticket",
        required: true
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model("Comment",CommentSchema);