const express = require("express");
const {
  createRoomOne,
  getAllRoomOne,
  getAllNotAssignedRoomOne,
  getRoomOneById,
  updateRoomOneById,
  createRoomTwo,
  deleteRoomOneById,
  deleteRoomTwoById,
  getAllRoomTwo,
  getAllNotAssignedRoomTwo,
  getRoomTwoById,
  updateRoomTwoById,
} = require("../controllers/roomController");
const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/roomone").post(createRoomOne).get(getAllRoomOne);
router.route("/roomone/notassigned").get(getAllNotAssignedRoomOne);
router.route("/roomtwo/notassigned").get(getAllNotAssignedRoomTwo);
router.route("/roomtwo").post(createRoomTwo).get(getAllRoomTwo);
router
  .route("/roomone/:id")
  .get(getRoomOneById)
  .put(updateRoomOneById)
  .delete(deleteRoomOneById);
router
  .route("/roomtwo/:id")
  .get(getRoomTwoById)
  .put(updateRoomTwoById)
  .delete(deleteRoomTwoById);

module.exports = router;
