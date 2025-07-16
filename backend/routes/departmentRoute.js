const express = require("express");
const { isAuthenticatedUser } = require("../middleware/auth");
const { getAllDepartment, createDepartment, updateDepartment, deleteDepartment } = require("../controllers/DepartmentController");

const router = express.Router();

router.route("/getAll").get(getAllDepartment, isAuthenticatedUser)
router.route("/create").post(createDepartment, isAuthenticatedUser)
router.route("/update/:id").put(updateDepartment, isAuthenticatedUser)
router.route("/delete/:id").delete(deleteDepartment, isAuthenticatedUser)

module.exports = router;