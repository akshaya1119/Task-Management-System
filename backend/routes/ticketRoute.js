const express = require("express");
const { createTicket, getAllTickets, getMyTicket, getSingleTicket, getCountStatusAndPrioritywise, UpdateTicket, deleteTicket, AdvancedSearch } = require("../controllers/TicketController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/create").post(createTicket,isAuthenticatedUser)
router.route("/getAll").get(getAllTickets,isAuthenticatedUser)
router.route("/getMy/:id").get(getMyTicket,isAuthenticatedUser)
router.route("/getSingle/:id").get(isAuthenticatedUser,getSingleTicket)
router.route("/getCounts/:id").get(isAuthenticatedUser,getCountStatusAndPrioritywise)
router.route("/updateticket/:id").put(isAuthenticatedUser,UpdateTicket)
router.route("/delete/:id").delete(isAuthenticatedUser,deleteTicket)
router.route("/AdvancedSearch").get(isAuthenticatedUser,AdvancedSearch)

module.exports = router;