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
const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.route("/activate/:token").get(activateUser);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/:id").delete(protect, admin, deleteUser);

module.exports = router;
