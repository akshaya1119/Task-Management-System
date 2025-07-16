const catchAsyncError = require("../middleware/catchAsyncError");
const tickettypes = require("../models/TicketType");
const ErrorHandler = require("../utils/errorhandler");

exports.getAlltickettype = catchAsyncError(async (req, res, next) => {
    const tickettype = await tickettypes.find();

    res.status(200).json({
        success: true,
        tickettype
    })
})

exports.createtickettype = catchAsyncError(async (req, res, next) => {
    const { tickettypeName } = req.body;

    const tickettype = await tickettypes.create({
        tickettypeName
    });

    res.status(201).json({
        success: true,
        tickettype
    })
})


exports.updatetickettype = catchAsyncError(async (req, res, next) => {
    const newtickettype = {
        tickettypeName: req.body.tickettypeName
    }
    const tickettype = await tickettypes.findByIdAndUpdate(req.params.id,
        newtickettype,
        {
            new: true,
            runValidators: true,
            useFindAndModify: false
        }
    );
    if (!tickettype) {
        return next(
            new ErrorHandler(`tickettype does not exist with Id: ${req.params.id}`, 400)
        )
    }
    res.status(200).json({
        success: true
    })

})


exports.deletetickettype = catchAsyncError(async (req, res, next) => {
    const tickettype = await tickettypes.findById();

    if (!tickettype) {
        return next(
            new ErrorHandler(`tickettype does not exist with Id: ${req.params.id}`, 400)
        )
    }
    await tickettype.remove();
    res.status(200).json({
        success: true,
        message: "tickettype deleted successfully"
    })
})