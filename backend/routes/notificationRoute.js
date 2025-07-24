const express = require("express")
const { MarkAllAsRead, MarkasRead, getUnreadCount, createNotification, getNotification } = require("../controllers/NotificationController")
const { isAuthenticatedUser } = require("../middleware/auth")

const router = express.Router()

router.route("/notifications/mark-all-read/:id").put(isAuthenticatedUser,MarkAllAsRead)
router.route("/notifications/mark-as-read/:id").put(isAuthenticatedUser,MarkasRead)
router.route("/notifications/getunreadcount").get(isAuthenticatedUser,getUnreadCount)
router.route("/create").post(isAuthenticatedUser,createNotification)
router.route("/getNotification/:id").get(isAuthenticatedUser,getNotification)
module.exports = router;