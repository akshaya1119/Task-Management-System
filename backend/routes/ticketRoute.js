const express = require("express");
const { createTicket, getAllTickets, getMyTicket, getSingleTicket, getCountStatusAndPrioritywise, UpdateTicket, deleteTicket, AdvancedSearch } = require("../controllers/TicketController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/create").post(createTicket,isAuthenticatedUser)
router.route("/getAll").get(getAllTickets,isAuthenticatedUser)
router.route("/getMy").get(getMyTicket,isAuthenticatedUser)
router.route("/getAll").get(getSingleTicket,isAuthenticatedUser)
router.route("/getAll").get(getCountStatusAndPrioritywise,isAuthenticatedUser)
router.route("/updateticket").put(UpdateTicket,isAuthenticatedUser)
router.route("/getAll").delete(deleteTicket,isAuthenticatedUser)
router.route("/AdvancedSearch").get(AdvancedSearch,isAuthenticatedUser)
router.route("/delete").delete(deleteTicket,isAuthenticatedUser)

module.exports = router;