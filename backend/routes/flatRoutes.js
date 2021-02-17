const express = require("express");
const {
  createFlatOne,
  getAllFlatOne,
  getFlatOneById,
  updateFlatOneById,
  createFlatTwo,
  deleteFlatOneById,
  deleteFlatTwoById,
  getAllFlatTwo,
  getFlatTwoById,
  updateFlatTwoById,
} = require("../controllers/flatController");
const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/flatone").post(createFlatOne).get(getAllFlatOne);
router.route("/flattwo").post(createFlatTwo).get(getAllFlatTwo);
router
  .route("/flatone/:id")
  .get(getFlatOneById)
  .put(updateFlatOneById)
  .delete(deleteFlatOneById);
router
  .route("/flattwo/:id")
  .get(getFlatTwoById)
  .put(updateFlatTwoById)
  .delete(deleteFlatTwoById);

module.exports = router;
