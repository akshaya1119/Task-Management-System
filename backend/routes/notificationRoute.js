const express = require("express")
const { MarkAllAsRead, MarkasRead } = require("../controllers/NotificationController")
const { isAuthenticatedUser } = require("../middleware/auth")

const router = express.Router()

router.route("/notifications/mark-all-read").put(MarkAllAsRead,isAuthenticatedUser)
router.route("/notifications/mark-as-read/:id").put(MarkasRead,isAuthenticatedUser)

module.exports = router;