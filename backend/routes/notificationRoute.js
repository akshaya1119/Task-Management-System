const express = require("express")
const { MarkAllAsRead, MarkasRead, getUnreadCount, createNotification, getNotification } = require("../controllers/NotificationController")
const { isAuthenticatedUser } = require("../middleware/auth")

const router = express.Router()

router.route("/notifications/mark-all-read/:id").put(MarkAllAsRead,isAuthenticatedUser)
router.route("/notifications/mark-as-read/:id").put(MarkasRead,isAuthenticatedUser)
router.route("/notifications/getunreadcount").get(getUnreadCount,isAuthenticatedUser)
router.route("/create").post(createNotification,isAuthenticatedUser)
router.route("/getNotification/:id").get(getNotification,isAuthenticatedUser)
module.exports = router;