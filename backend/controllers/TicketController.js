const catchAsyncError = require("../middleware/catchAsyncError");
const Ticket = require("../models/Ticket");
const Notification = require("../models/Notification");
const User = require("../models/User");
const ErrorHandler = require("../utils/errorhandler");
const sendEmail = require("../utils/sendEmail");
const ApiFeatures = require("../utils/apiFeatures");
const comment = require("../models/comment");

exports.getAllTickets = catchAsyncError(async (req, res, next) => {
  const tickets = await Ticket.find()
    .populate({ path: "department", select: "DepartmentName" })
    .populate({ path: "tickettype", select: "TicketType" })
    .populate({ path: "project", select: "ProjectName" })
    .populate({ path: "assignee", select: "fullname" })
    .populate({ path: "creator", select: "fullname" });

  res.status(200).json({
    success: true,
    tickets,
  })
})

exports.getOpenAndDueTicket = catchAsyncError(async (req, res, next) => {
  const tickets = await Ticket.find({ status: "open", dueDate: { $lt: new Date() } })
  const updatedTickets = await Promise.all(
    tickets.map(async (ticket) => {
      ticket.status = "pending";
      return await ticket.save();
    })
  );
  // Send response
  res.status(200).json({
    success: true,
    data: updatedTickets,
  });
})

exports.AdvancedSearch = catchAsyncError(async (req, res, next) => {
  const ticketApi = new ApiFeatures(Ticket.find(), req.query)
    .search()
    .filter();
  const tickets = await ticketApi.query.lean()
  const commentApi = new ApiFeatures(comment.find(), req.query)
    .search()
    .filter();
  const comments = await commentApi.query.lean()
  res.status(200).json({
    success: true,
    tickets,
    comments
  })
})

exports.getSingleTicket = catchAsyncError(async (req, res, next) => {
  const ticket = await Ticket.findById(req.params.id)
    .populate({ path: "department", select: "DepartmentName" })
    .populate({ path: "tickettype", select: "TicketType" })
    .populate({ path: "project", select: "ProjectName" })
    .populate({ path: "assignee", select: "fullname" })
    .populate({ path: "creator", select: "fullname" });

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
    .populate({ path: "department", select: "DepartmentName" })
    .populate({ path: "tickettype", select: "TicketType" })
    .populate({ path: "project", select: "ProjectName" })
    .populate({ path: "assignee", select: "fullname" })
    .populate({ path: "creator", select: "fullname" });

  res.status(200).json({
    success: true,
    MyTickets
  })
})

exports.getCountStatusAndPrioritywise = catchAsyncError(async (req, res, next) => {
  const userid = req.params.id;
  const LowPriorityTickets = await Ticket.find({ assignee: userid, priority: "low" })
  const MediumPriorityTickets = await Ticket.find({ assignee: userid, priority: "medium" })
  const HighPriorityTickets = await Ticket.find({ assignee: userid, priority: "high" })
  const OpenTickets = await Ticket.find({ assignee: userid, status: "open" })
  const InProgressTickets = await Ticket.find({ assignee: userid, status: "InProgress" })
  const CompletedTickets = await Ticket.find({ assignee: userid, status: "Completed" })
  const PendingTickets = await Ticket.find({ assignee: userid, status: "pending" })

  res.status(200).json({
    success: true,
    count: {
      LowPriorityTickets,
      MediumPriorityTickets,
      HighPriorityTickets,
      OpenTickets,
      InProgressTickets,
      CompletedTickets,
      PendingTickets
    }
  })
})


exports.createTicket = catchAsyncError(async (req, res, next) => {
  const { priority, status, tickettype, description, title
    , project, assignee,
    creator, createdAt, dueDate } = req.body

  const attachment = req.file ? req.file.filename : null;

  const assignedUser = await User.findById(assignee)
  const department = assignedUser?.department;

  if (!department) {
    return res.status(400).json({
      success: false,
      message: "Assignee's department not found."
    });
  }
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

    await Notification.create({
      UserId: assignee,
      type: "assignment",
      message: `You have been assigned to ticket: ${title}`,
      TicketId: Tickets._id,
      CreatedBy: creator,
    })
    const io = req.app.get("io")
    if (io) {
      io.to(assignee).emit("notification", {
        type: "assignment",
        message: `You have been assigned to ticket: ${title}`,
        ticketId: Tickets._id,
      })
    }
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