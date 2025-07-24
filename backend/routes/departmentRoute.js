const express = require("express");
const { isAuthenticatedUser } = require("../middleware/auth");
const { getAllDepartment, createDepartment, updateDepartment, deleteDepartment } = require("../controllers/DepartmentController");

const router = express.Router();

router.route("/getAll").get(isAuthenticatedUser,getAllDepartment)
router.route("/create").post(isAuthenticatedUser,createDepartment)
router.route("/update/:id").put(isAuthenticatedUser,updateDepartment)
router.route("/delete/:id").delete(isAuthenticatedUser,deleteDepartment)

module.exports = router;