const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    priority: {
        type: String,
        required: [true, "Please Enter Priority"]
    },
    status: {
        type: String,
        required: [true, "Please Enter Status"]
    },
    tickettype: {
        type: mongoose.Schema.ObjectId,
        ref: "TicketType",
        required: true
    },
    description: {
        type: String,
        required: [true, "Please Enter Ticket Description"],
    },
    title: {
        type: String,
        required: [true, "Please Enter Ticket Title"],
    },
    project: {
        type: mongoose.Schema.ObjectId,
        ref: "Project",
        required: true,
    },
    department: {
        type: mongoose.Schema.ObjectId,
        ref: "Department",
        required: true,
    },
    attachment: {
        type: String,
    },
    assignee: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    creator: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    dueDate: {
        type: Date,
        required: true,
    }
})

module.exports = mongoose.model("Ticket", ticketSchema)