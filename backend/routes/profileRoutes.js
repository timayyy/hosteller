const express = require("express");
const { getCurrentUserProfile, getUserProfile, createUserProfile, updateUserProfile } = require("../controllers/profileController");
const { validate, userProfileValidationRules, userUpdateProfileValidationRules } = require("../utils/validator")
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(protect, getCurrentUserProfile).post(protect, userProfileValidationRules(), validate, createUserProfile).put(protect, userUpdateProfileValidationRules(), validate, updateUserProfile)
router.route("/:user_id").get(protect, getUserProfile)

module.exports = router;
