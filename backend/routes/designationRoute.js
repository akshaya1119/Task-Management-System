const express = require("express");
const { getAllDesignation, createDesignation, updateDesignation, deleteDesignation } = require("../controllers/DesignationController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/getAll").get(getAllDesignation, isAuthenticatedUser)
router.route("/create").post(createDesignation, isAuthenticatedUser)
router.route("/update/:id").put(updateDesignation, isAuthenticatedUser)
router.route("/delete/:id").delete(deleteDesignation, isAuthenticatedUser)
module.exports = router;