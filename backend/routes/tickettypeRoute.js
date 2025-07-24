const express = require("express");
const { isAuthenticatedUser } = require("../middleware/auth");
const { getAlltickettype, createtickettype, updatetickettype, deletetickettype } = require("../controllers/TicketTypeController");

const router = express.Router();

router.route("/getAll").get(isAuthenticatedUser,getAlltickettype)
router.route("/create").post(isAuthenticatedUser,createtickettype)
router.route("/update/:id").put(isAuthenticatedUser,updatetickettype )
router.route("/delete/:id").delete(isAuthenticatedUser,deletetickettype)

module.exports = router;