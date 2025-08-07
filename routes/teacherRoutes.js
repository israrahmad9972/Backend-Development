const express = require("express");
const { teacherController } = require("../controllers");
const { protect, restrictTo } = require("../middlewares/authMiddleware");

const router = express.Router();

router
  .route("/")
  .get(protect, teacherController.getAllTeachers)
  .post(protect, restrictTo("admin"), teacherController.createTeacher);

router
  .route("/:id")
  .get(protect, teacherController.getTeacher)
  .patch(protect, restrictTo("admin"), teacherController.updateTeacher)
  .delete(protect, restrictTo("admin"), teacherController.deleteTeacher);

module.exports = router;
