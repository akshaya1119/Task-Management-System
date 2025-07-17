const catchAsyncError = require("../middleware/catchAsyncError");
const project = require("../models/project");
const ActivityLog = require("../models/ActivityLog")
const ErrorHandler = require("../utils/errorhandler");
const ApiFeatures = require("../utils/apiFeatures");

exports.getAllproject = catchAsyncError(async (req, res, next) => {
    const projects = await project.find();

    res.status(200).json({
        success: true,
        projects
    })
})

exports.createproject = catchAsyncError(async (req, res, next) => {
    const { ProjectName, status, ProjectLeader, TeamMembers } = req.body;

    const project = await project.create({
        ProjectName, status, ProjectLeader, TeamMembers
    });

    res.status(201).json({
        success: true,
        project
    })
})

exports.getRecentActivityOfProject = catchAsyncError(async (req, res, next) => {
    const resultPerPage = 10
    const Project = new ApiFeatures(ActivityLog.find({ projectId: req.params.id }), res.query)
        .pagination(resultPerPage);
    const recentactivity = await Project.query;
    res.status(200).json({
        success: true,
        recentactivity
    })
})

exports.getTeamActivity = catchAsyncError(async (req, res, next) => {
    const Project = await project.findById(req.params.id)
    const getAssignedMembers=Project.TeamMembers;
    const AssignedMembers = new ApiFeatures(ActivityLog.find({ projectId: req.params.id ,
         userId: { $in: getAssignedMembers }, }), query)
       .search().filter().pagination(10)
    const teamactivity = await AssignedMembers.query()
    res.status(200).json({
        success: true,
        teamactivity,
    })
})

exports.getSingleProject = catchAsyncError(async (req, res, next) => {
    const Project = await project.findById(req.params.id)
    if (!Project) {
        return next(
            new ErrorHandler(`Project does not exist with Id: ${req.params.id}`)
        );
    }
    res.status(200).json({
        success: true,
        Project
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