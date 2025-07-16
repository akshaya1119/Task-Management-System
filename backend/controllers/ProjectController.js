const catchAsyncError = require("../middleware/catchAsyncError");
const project = require("../models/project");
const ErrorHandler = require("../utils/errorhandler");

exports.getAllproject = catchAsyncError(async (req, res, next) => {
    const projects = await project.find();

    res.status(200).json({
        success: true,
        projects
    })
})

exports.createproject = catchAsyncError(async (req, res, next) => {
    const { ProjectName,status,ProjectLeader, TeamMembers} = req.body;

    const project = await project.create({
        ProjectName,status,ProjectLeader,TeamMembers
    });

    res.status(201).json({
        success: true,
        project
    })
})

exports.updateproject = catchAsyncError(async (req, res, next) => {
    const newproject = {
        project: req.body.project
    }

    const project = await project.findByIdAndUpdate(
        req.params.id,
        newproject,
        { new: true, runValidators: true, useFindAndModify: false }
    );

    if (!project) {
        return next(
            new ErrorHandler(`project does not exist with Id: ${req.params.id}`, 400)
        );
    }
    res.status(200).json({
        success: true,

    });
})

exports.deleteproject = catchAsyncError(async (req, res, next) => {
    const project = await project.findById(req.params.id)

    if (!project) {
        return next(
            new ErrorHandler(`project does not exist with Id: ${req.params.id}`, 400)
        );
    }
    await project.remove();

    res.status(200).json({
        success: true,
        message: "project deleted successfully"
    })
})