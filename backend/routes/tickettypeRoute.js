const express = require("express");
const { isAuthenticatedUser } = require("../middleware/auth");
const { getAlltickettype, createtickettype, updatetickettype, deletetickettype } = require("../controllers/TicketTypeController");

const router = express.Router();

router.route("/getAll").get(getAlltickettype, isAuthenticatedUser)
router.route("/create").post(createtickettype, isAuthenticatedUser)
router.route("/update/:id").put(updatetickettype, isAuthenticatedUser)
router.route("/delete/:id").delete(deletetickettype, isAuthenticatedUser)

module.exports = router;