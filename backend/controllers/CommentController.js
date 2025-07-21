const catchAsyncError = require("../middleware/catchAsyncError");
const comment = require("../models/comment");
const notification = require("../models/Notification");
const Ticket = require("../models/Ticket");
const ticket = require("../models/Ticket");
const User = require("../models/User");
const ErrorHandler = require("../utils/errorhandler");


exports.createcomment = catchAsyncError(async (req, res, next) => {
  const { ticketId, userId, comment, createdAt } = req.body
  const io = req.app.get("io");
  const comments = await comment.create({
    ticketId, userId, comment, createdAt
  })

  const ticket = await Ticket.findById(ticketId).populate("assignee , creator, title")
  if (!ticket) return next(new ErrorHandler("Ticket not found", 404));

  const currentUserId = userId
  const CurrentUser = await User.findById(currentUserId);
  const CurrentUserName = CurrentUser?.fullname || "Someone";

  const mentionRegex = /@(\w+)/g;
  const mentionedUsernames = [...comment.matchAll(mentionRegex)].map(m => m[1]);
  const mentionedUsers = await User.find({ fullname: { $in: mentionedUsernames } });

  const mentionedUserIds = mentionedUsers.map(user => user._id.toString());

  const allUsersToNotify = new Set();

  // 1. Mentioned users
  mentionedUserIds.forEach(uid => {
    if (uid !== currentUserId) allUsersToNotify.add(uid);
  });

  // 2. Ticket assignee
  if (ticket.assignee && ticket.assignee._id.toString() !== currentUserId) {
    allUsersToNotify.add(ticket.assignee._id.toString());
  }

  // 3. Ticket creator
  if (ticket.creator && ticket.creator._id.toString() !== currentUserId) {
    allUsersToNotify.add(ticket.creator._id.toString());
  }

  // 4. Previous commenters
  const previousComments = await Comment.find({ ticketId });
  previousComments.forEach(comment => {
    if (comment.userId.toString() !== currentUserId) {
      allUsersToNotify.add(comment.userId.toString());
    }
  });

  // 5. Send notifications
  for (const userId of allUsersToNotify) {
    await Notification.create({
      userId: userId,
      type: "comment",
      message: `${CurrentUserName} commented on ticket ${ticket.title}`,
      TicketId: ticket._id,
      relatedComment: comments._id,
      CreatedBy: currentUserId,
    });

    io.to(userId).emit('notification', {
      type: "comment",
      message: `${CurrentUserName} commented on ticket ${ticket.title}`
    });
  }

  res.status(201).json({
    success: true,
    comments
  })
})

exports.Updatecomment = catchAsyncError(async (req, res, next) => {
  const Updatingcomment = {
    ticketId: req.body.ticketId,
    userId: req.body.userId,
    comment: req.body.comment,
    createdAt: req.body.createdAt,
  }

  await comment.findByIdAndUpdate(req.params.id, Updatingcomment, {
    new: true,
    runValidators: true
  })

  res.status(204).json({
    success: true,
  })
})

exports.getCommentsOfATicket = catchAsyncError(async (req, res, next) => {
  const ticketId = req.params.id
  const comment = await comment.find({ ticketId: ticketId })
  .populate({path: "userId", select: "fullName"})

  res.status(200).json({
    success: true,
    comment
  })

})

exports.deletecomment = catchAsyncError(async (req, res, next) => {
  const comment = await comment.findById(req.params.id);

  if (!comment) {
    return next(
      new ErrorHandler(`comment does not exist with Id: ${req.params.id}`, 400)
    );
  }

  await comment.remove();

  res.status(200).json({
    success: true,
    message: "comment Deleted Successfully",
  });
});