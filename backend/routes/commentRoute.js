const express = require("express");
const { createcomment, Updatecomment, getCommentsOfATicket, deletecomment } = require("../controllers/CommentController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/create").post(isAuthenticatedUser,createcomment)
router.route("/update/:id").put(isAuthenticatedUser,Updatecomment)
router.route("/getComment/:ticketId").get(isAuthenticatedUser,getCommentsOfATicket)
router.route("/delete/:id").delete(isAuthenticatedUser,deletecomment)
module.exports = router;