const express = require("express");
const { isAuthenticatedUser } = require("../middleware/auth");
const { getAllproject, createproject, updateproject, deleteproject } = require("../controllers/ProjectController");

const router = express.Router();

router.route("/getAll").get(getAllproject, isAuthenticatedUser)
router.route("/create").post(createproject, isAuthenticatedUser)
router.route("/update/:id").put(updateproject, isAuthenticatedUser)
router.route("/delete/:id").delete(deleteproject, isAuthenticatedUser)

module.exports = router;