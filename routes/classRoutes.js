const express = require("express");
const { classController } = require("../controllers");
const { protect, restrictTo } = require("../middlewares/authMiddleware");

const router = express.Router();

router
  .route("/")
  .get(protect, classController.getAllClasses)
  .post(protect, restrictTo("admin"), classController.createClass);

router
  .route("/:id")
  .get(protect, classController.getClassById)
  .patch(protect, restrictTo("admin"), classController.updateClass)
  .delete(protect, restrictTo("admin"), classController.deleteClass);

module.exports = router;
