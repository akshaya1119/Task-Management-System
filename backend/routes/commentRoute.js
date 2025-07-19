const express = require("express");
const { createcomment, Updatecomment, getCommentsOfATicket, deletecomment } = require("../controllers/CommentController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/create").post(createcomment,isAuthenticatedUser)
router.route("/update/:id").put(Updatecomment,isAuthenticatedUser)
router.route("/getComment/:ticketId").get(getCommentsOfATicket,isAuthenticatedUser)
router.route("/delete/:id").delete(deletecomment,isAuthenticatedUser)
module.exports = router;