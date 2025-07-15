const catchAsyncError = require("../middleware/catchAsyncError");
const Ticket = require("../models/Ticket");
const ErrorHandler = require("../utils/errorhandler");

exports.getAllTickets = catchAsyncError(async (req, res, next) => {
    const tickets = await Ticket.find();

    res.status(200).json({
        success: true,
        tickets,
    })
})

exports.getSingleTicket = catchAsyncError(async (req, res, next) => {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
        return next(
            new ErrorHandler(`Ticket does not exist : ${req.params.id}`)
        )
    }

    res.status(200).json({
        success: true,
        ticket
    })
})

exports.deleteTicket = catchAsyncError(async (req, res, next) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }

  await ticket.remove();

  res.status(200).json({
    success: true,
    message: "Ticket Deleted Successfully",
  });
});