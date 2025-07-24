const express = require("express");
const { isAuthenticatedUser } = require("../middleware/auth");
const { getAllroles, createroles, updateroles, deleteroles } = require("../controllers/RoleController");

const router = express.Router();

router.route("/getAll").get(isAuthenticatedUser,getAllroles)
router.route("/create").post(isAuthenticatedUser,createroles)
router.route("/update/:id").put(isAuthenticatedUser,updateroles)
router.route("/delete/:id").delete(isAuthenticatedUser,deleteroles)

module.exports = router;