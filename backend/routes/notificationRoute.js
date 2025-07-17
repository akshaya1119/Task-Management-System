const express = require("express")
const { MarkAllAsRead, MarkasRead, getUnreadCount } = require("../controllers/NotificationController")
const { isAuthenticatedUser } = require("../middleware/auth")

const router = express.Router()

router.route("/notifications/mark-all-read").put(MarkAllAsRead,isAuthenticatedUser)
router.route("/notifications/mark-as-read/:id").put(MarkasRead,isAuthenticatedUser)
router.route("/notifications/getunreadcount").get(getUnreadCount,isAuthenticatedUser)

module.exports = router;