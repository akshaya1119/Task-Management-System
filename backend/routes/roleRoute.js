const express = require("express");
const { isAuthenticatedUser } = require("../middleware/auth");
const { getAllroles, createroles, updateroles, deleteroles } = require("../controllers/RoleController");

const router = express.Router();

router.route("/getAll").get(getAllroles, isAuthenticatedUser)
router.route("/create").post(createroles, isAuthenticatedUser)
router.route("/update/:id").put(updateroles, isAuthenticatedUser)
router.route("/delete/:id").delete(deleteroles, isAuthenticatedUser)

module.exports = router;