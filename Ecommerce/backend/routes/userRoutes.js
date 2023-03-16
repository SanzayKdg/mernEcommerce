const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  passwordRecovery,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUserRole,
} = require("../controllers/userController");
const { isLogin, authorizedRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/update").put(isLogin, updatePassword);

router.route("/password/reset/:token").put(passwordRecovery);

router.route("/logout").get(logoutUser);

router.route("/profile").get(isLogin, getUserDetails);

router.route("/profile/update").put(isLogin, updateProfile);

router
  .route("/admin/users")
  .get(isLogin, authorizedRoles("admin"), getAllUsers);

router
  .route("/admin/user/:id")
  .get(isLogin, authorizedRoles("admin"), getSingleUser)
  .put(isLogin, authorizedRoles("admin"), updateUserRole)
  .delete(isLogin, authorizedRoles("admin"), deleteUser);

module.exports = router;
