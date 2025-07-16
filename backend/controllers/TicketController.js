const catchAsyncError = require("../middleware/catchAsyncError");
const Ticket = require("../models/Ticket");
const Ticket = require("../models/Ticket");
const tickettype = require("../models/TicketType");
const User = require("../models/User");
const ErrorHandler = require("../utils/errorhandler");
const sendEmail = require("../utils/sendEmail");

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

exports.getMyTicket = catchAsyncError(async (req, res, next) => {
  const userId = req.params.id
  const MyTickets = await Ticket.find({ assignee: userId })
  res.status(200).json({
    success: true,
    MyTickets
  })
})

exports.getCountStatusAndPrioritywise = catchAsyncError(async (req, res, next) => {
  const userid = req.params.id;
  const LowPriorityTickets = await Ticket.countDocuments({ assignee: userid, priority: low })
  const MediumPriorityTickets = await Ticket.countDocuments({ assignee: userid, priority: medium })
  const HighPriorityTickets = await Ticket.countDocuments({ assignee: userid, priority: high })
  const OpenTickets = await Ticket.countDocuments({ assignee: userid, status: Open })
  const CompletedTickets = await Ticket.countDocuments({ assignee: userid, status: Completed })
  const PendingTickets = await Ticket.countDocuments({ assignee: userid, status: Pending })

  res.status(200).json({
    success: true,
    count: {
      LowPriorityTickets,
      MediumPriorityTickets,
      HighPriorityTickets,
      OpenTickets,
      CompletedTickets,
      PendingTickets
    }
  })
})


exports.createTicket = catchAsyncError(async (req, res, next) => {
  const { priority, status, tickettype, description, title
    , project, department, attachment, assignee,
    creator, createdAt, dueDate } = req.body
  const Tickets = await Ticket.create({
    priority, status, tickettype, description,
    title, project, department, attachment,
    assignee, creator, createdAt, dueDate

  })
  try {
    const user = await User.findById(assignee);
    const message = `A ticket has been created for you with title ${title}`
    if (!user) {
      return next(new ErrorHandler("Assignee not found", 404));
    }
    await sendEmail({
      email: user.email,
      subject: `Ticket has been created`,
      message,
    });
    res.status(201).json({
      success: true,
      Tickets
    })
  }
  catch (error) {
    return next(new ErrorHandler(error.message, 500))
  }

})

exports.UpdateTicket = catchAsyncError(async (req, res, next) => {
  const UpdatingTicket = {
    priority: req.body.priority,
    status: req.body.status,
    tickettype: req.body.tickettype,
    description: req.body.description,
    title: req.body.title,
    project: req.body.project,
    department: req.body.department,
    attachment: req.body.attachment,
    assignee: req.body.assignee,
    creator: req.body.creator,
    createdAt: req.body.createdAt,
    dueDate: req.body.dueDate
  }

  await Ticket.findByIdAndUpdate(req.params.id, UpdatingTicket, {
    new: true,
    runValidators: true
  })

  res.status(204).json({
    success: true,
  })
})

exports.deleteTicket = catchAsyncError(async (req, res, next) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    return next(
      new ErrorHandler(`Ticket does not exist with Id: ${req.params.id}`, 400)
    );
  }

  await ticket.remove();

  res.status(200).json({
    success: true,
    message: "Ticket Deleted Successfully",
  });
});