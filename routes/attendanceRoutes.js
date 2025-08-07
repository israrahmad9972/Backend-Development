const express = require("express");
const { attendanceController } = require("../controllers");
const { protect, restrictTo } = require("../middlewares/authMiddleware");

const router = express.Router();

router
  .route("/")
  .get(protect, attendanceController.getAllAttendance)
  .post(protect, attendanceController.createAttendance);

router
  .route("/:id")
  .get(protect, attendanceController.getAttendanceById)
  .patch(protect, restrictTo("admin"), attendanceController.updateAttendance)
  .delete(protect, restrictTo("admin"), attendanceController.deleteAttendance);

module.exports = router;
