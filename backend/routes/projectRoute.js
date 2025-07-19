const express = require("express");
const { isAuthenticatedUser } = require("../middleware/auth");
const { getAllproject, createproject, updateproject, deleteproject, getRecentActivityOfProject, getTeamActivity, getSingleProject } = require("../controllers/ProjectController");

const router = express.Router();

router.route("/getAll").get(getAllproject, isAuthenticatedUser)
router.route("/create").post(createproject, isAuthenticatedUser)
router.route("/update/:id").put(updateproject, isAuthenticatedUser)
router.route("/delete/:id").delete(deleteproject, isAuthenticatedUser)
router.route("/getRecentActivity/:projectId").get(getRecentActivityOfProject,isAuthenticatedUser)
router.route("/getTeamActivity/:projectId").get(getTeamActivity,isAuthenticatedUser)
router.route("/getSingle/:id").get(getSingleProject,isAuthenticatedUser)

module.exports = router;