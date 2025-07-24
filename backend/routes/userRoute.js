// Public test endpoint
const express = require("express");
const {
  registerUser,
  getUserDetails,
  updateUserRole,
  getAllUser,
  getSingleUser,
  deleteUser,
  uploadProfilePicture,
} = require("../controllers/UserController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const upload = require("../middleware/multer")

const router = express.Router();

router.route("/register").post(registerUser);

router.route('/:id/profile-picture').put(isAuthenticatedUser,upload.single('profilepicture'),uploadProfilePicture);

router.route("/me").get(isAuthenticatedUser, getUserDetails);
router
  .route("/admin/users")
  .get(isAuthenticatedUser, getAllUser);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;