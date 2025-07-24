const express = require("express");
const { isAuthenticatedUser } = require("../middleware/auth");
const { getAllproject, createproject, updateproject, deleteproject, getRecentActivityOfProject, getTeamActivity, getSingleProject } = require("../controllers/ProjectController");

const router = express.Router();

router.route("/getAll").get(isAuthenticatedUser,getAllproject)
router.route("/create").post(isAuthenticatedUser,createproject)
router.route("/update/:id").put(isAuthenticatedUser,updateproject)
router.route("/delete/:id").delete(isAuthenticatedUser,deleteproject)
router.route("/getRecentActivity/:projectId").get(isAuthenticatedUser,getRecentActivityOfProject)
router.route("/getTeamActivity/:projectId").get(isAuthenticatedUser,getTeamActivity)
router.route("/getSingle/:id").get(isAuthenticatedUser,getSingleProject)

module.exports = router;