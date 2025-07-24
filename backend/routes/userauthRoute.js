const express = require("express");
const { loginUser, forgotPassword, resetPassword, logout } = require("../controllers/LoginController");
const router = express.Router();

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);

module.exports = router;
