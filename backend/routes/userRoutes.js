const express = require("express");
const {
  authUser,
  registerUser,
  activateUser,
  getUserProfile,
  getUsers,
  updateUserProfile,
  deleteUser,
} = require("../controllers/userController");
const { userRegisterValidationRules, userLoginValidationRules, validate } = require("../utils/validator")
const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/register").post(userRegisterValidationRules(), validate, registerUser)
router.route("/activate/:token").get(activateUser);
router.route("/login").post(userLoginValidationRules(), validate, authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/:id").delete(protect, admin, deleteUser);

module.exports = router;
