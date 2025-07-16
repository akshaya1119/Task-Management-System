const catchAsyncError = require("../middleware/catchAsyncError");
const Designation = require("../models/Designation");
const ErrorHandler = require("../utils/errorhandler");

exports.getAllDesignation = catchAsyncError(async (req, res, next) => {
    const Designations = await Designation.find();

    res.status(200).json({
        success: true,
        Designations
    })
})

exports.createDesignation = catchAsyncError(async (req, res, next) => {
    const { Designation } = req.body;

    const designation = await Designation.create({
        Designation
    });

    res.status(201).json({
        success: true,
        designation
    })
})

exports.updateDesignation = catchAsyncError(async (req, res, next) => {
    const newDesignation = {
        Designation: req.body.Designation
    }

    const designation = await Designation.findByIdAndUpdate(
        req.params.id,
        newDesignation,
        { new: true, runValidators: true, useFindAndModify: false }
    );

    if (!designation) {
        return next(
            new ErrorHandler(`Designation does not exist with Id: ${req.params.id}`, 400)
        );
    }
    res.status(200).json({
        success: true,

    });
})

exports.deleteDesignation = catchAsyncError(async (req, res, next) => {
    const designation = await Designation.findById(req.params.id)

    if (!designation) {
        return next(
            new ErrorHandler(`Designation does not exist with Id: ${req.params.id}`, 400)
        );
    }
    await designation.remove();

    res.status(200).json({
        success: true,
        message: "Designation deleted successfully"
    })
})