const catchAsyncError = require("../middleware/catchAsyncError");
const roles = require("../models/Role");
const ErrorHandler = require("../utils/errorhandler");

exports.getAllroles = catchAsyncError(async (req, res, next) => {
    const roles = await roles.find();

    res.status(200).json({
        success: true,
        roles
    })
})

exports.createroles = catchAsyncError(async (req, res, next) => {
    const { rolesName } = req.body;

    const roles = await roles.create({
        rolesName
    });

    res.status(201).json({
        success: true,
        roles
    })
})


exports.updateroles = catchAsyncError(async (req, res, next) => {
    const newroles = {
        rolesName: req.body.rolesName
    }
    const roles = await roles.findByIdAndUpdate(req.params.id,
        newroles,
        {
            new: true,
            runValidators: true,
            useFindAndModify: false
        }
    );
    if (!roles) {
        return next(
            new ErrorHandler(`roles does not exist with Id: ${req.params.id}`, 400)
        )
    }
    res.status(200).json({
        success: true
    })

})


exports.deleteroles = catchAsyncError(async (req, res, next) => {
    const roles = await roles.findById();

    if (!roles) {
        return next(
            new ErrorHandler(`roles does not exist with Id: ${req.params.id}`, 400)
        )
    }
    await roles.remove();
    res.status(200).json({
        success: true,
        message: "roles deleted successfully"
    })
})