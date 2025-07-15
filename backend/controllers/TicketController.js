const catchAsyncError = require("../middleware/catchAsyncError");
const Ticket = require("../models/Ticket")

exports.getAllTickets = catchAsyncError(async(req,res,next)=>{
    const tickets = await Ticket.find();

    res.status(200).json({
        success: true,
        tickets,
    })
})

exports.getSingleTicket = catchAsyncError(async(req,res,next)=>{
    const ticket = await Ticket.findById(req.params.id);
})