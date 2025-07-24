const express = require("express");
const { getAllDesignation, createDesignation, updateDesignation, deleteDesignation } = require("../controllers/DesignationController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/getAll").get(isAuthenticatedUser,getAllDesignation)
router.route("/create").post(isAuthenticatedUser,createDesignation)
router.route("/update/:id").put(isAuthenticatedUser,updateDesignation)
router.route("/delete/:id").delete(isAuthenticatedUser,deleteDesignation)
module.exports = router;