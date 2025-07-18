const  mongoose  = require("mongoose");

const TicketTypeSchema = new mongoose.Schema({
    TicketType: {
        type: String,
        required: [true, "Please Enter Ticket Type"]
    }
})

module.exports = mongoose.model("TicketType", TicketTypeSchema)