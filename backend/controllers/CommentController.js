const catchAsyncError = require("../middleware/catchAsyncError");
const comment = require("../models/comment");
const ErrorHandler = require("../utils/errorhandler");

exports.getAllcomments = catchAsyncError(async (req, res, next) => {
  const comments = await comment.find();

  res.status(200).json({
    success: true,
    comments,
  })
})

exports.getSinglecomment = catchAsyncError(async (req, res, next) => {
  const comment = await comment.findById(req.params.id);
  if (!comment) {
    return next(
      new ErrorHandler(`comment does not exist : ${req.params.id}`)
    )
  }

  res.status(200).json({
    success: true,
    comment
  })
})

exports.createcomment = catchAsyncError(async (req, res, next) => {
  const { ticketId, userId, comment, createdAt } = req.body
  const comments = await comment.create({
    ticketId,userId, comment, createdAt
  })
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