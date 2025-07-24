const catchAsyncError = require("../middleware/catchAsyncError");
const Departments = require("../models/Department");
const ErrorHandler = require("../utils/errorhandler");

exports.getAllDepartment = catchAsyncError(async (req, res, next) => {
    const department = await Departments.find();

    res.status(200).json({
        success: true,
        department
    })
})



exports.createDepartment = catchAsyncError(async (req, res, next) => {
    const { DepartmentName } = req.body;

    const department = await Departments.create({
        DepartmentName
    });

    res.status(201).json({
        success: true,
        department
    })
})


exports.updateDepartment = catchAsyncError(async (req, res, next) => {
    const newDepartment = {
        DepartmentName: req.body.DepartmentName
    }
    const department = await Departments.findByIdAndUpdate(req.params.id,
        newDepartment,
        {
            new: true,
            runValidators: true,
            useFindAndModify: false
        }
    );
    if (!department) {
        return next(
            new ErrorHandler(`Department does not exist with Id: ${req.params.id}`, 400)
        )
    }
    res.status(200).json({
        success: true
    })

})


exports.deleteDepartment = catchAsyncError(async (req, res, next) => {
    const department = await Departments.findById();

    if (!department) {
        return next(
            new ErrorHandler(`Department does not exist with Id: ${req.params.id}`, 400)
        )
    }
    await department.remove();
    res.status(200).json({
        success: true,
        message: "Department deleted successfully"
    })
})