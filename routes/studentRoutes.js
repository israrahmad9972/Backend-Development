const express = require("express");
const { studentController } = require("../controllers");
const { protect, restrictTo } = require("../middlewares/authMiddleware");

const router = express.Router();

router
  .route("/")
  .get(protect, studentController.getAllStudents)
  .post(protect, restrictTo("admin"), studentController.createStudent);

router
  .route("/:id")
  .get(protect, studentController.getStudentById)
  .patch(protect, restrictTo("admin"), studentController.updateStudent)
  .delete(protect, restrictTo("admin"), studentController.deleteStudent);

module.exports = router;
