const catchAsyncError = require("../middleware/catchAsyncError");
const Notification = require("../models/Notification");
const ErrorHandler = require("../utils/errorhandler");

exports.MarkasRead = catchAsyncError(async (req, res, next) => {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
        return next(
            new ErrorHandler(`Notification does not exist with Id : ${req.params.id}`)
        )

    }
    notification.isRead = true;
    await notification.save()
    res.status(200).json({
        success: true,
        notification,
    })
})

exports.createNotification = catchAsyncError(async (req, res, next) => {
    const { UserId, type, message, CreatedBy, TicketId, CommentId } = req.body;

    const notification = await Notification.create({
        UserId, type, message, CreatedBy, TicketId, CommentId
    })

    res.status(201).json({
        success: true,
        notification,
    })
})

exports.MarkAllAsRead = catchAsyncError(async (req, res, next) => {
    const userId = req.params.id
    const Allunreadnotification = await Notification.updateMany({ UserId: userId, isRead: false },
        { $set: { isRead: true } })

    res.status(200).json({
        success: true,
        message: "All your unread notifications have been marked as read",
    })
})

exports.getUnreadCount = catchAsyncError(async(req,res,next)=>{
    const getUnread = await Notification.countDocuments({UserId: req.params.id , isRead:false})
    res.status(200).json({
        success:true,
        getUnread
    })
})

