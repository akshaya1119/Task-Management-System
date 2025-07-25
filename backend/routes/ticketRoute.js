const express = require("express");
const { createTicket, getAllTickets, getMyTicket, getSingleTicket, getCountStatusAndPrioritywise, UpdateTicket, deleteTicket, AdvancedSearch,getOpenAndDueTicket } = require("../controllers/TicketController");
const { isAuthenticatedUser } = require("../middleware/auth");
const upload = require("../middleware/multer");

const router = express.Router();

router.route("/create").post(isAuthenticatedUser,upload.array("attachments", 10),createTicket)
router.route("/getAll").get(isAuthenticatedUser,getAllTickets)
router.route("/getMy/:id").get(isAuthenticatedUser,getMyTicket)
router.route("/getSingle/:id").get(isAuthenticatedUser,getSingleTicket)
router.route("/getCounts/:id").get(isAuthenticatedUser,getCountStatusAndPrioritywise)
router.route("/updateticket/:id").put(isAuthenticatedUser,UpdateTicket)
router.route("/delete/:id").delete(isAuthenticatedUser,deleteTicket)
router.route("/AdvancedSearch").get(isAuthenticatedUser,AdvancedSearch)
router.route("/getOpenAndDueTicket").get(isAuthenticatedUser,getOpenAndDueTicket)

module.exports = router;