const { studentService } = require("../services");
const { catchAsync } = require("../utils");
const httpStatus = require("http-status-codes");
const APIFeatures = require("../utils/apiFeatures");
const Student = require("../models/studentModel");

// GET /api/students
const getAllStudents = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Student.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const students = await features.query;

  res.status(httpStatus.OK).json({
    status: "success",
    results: students.length,
    data: students,
  });
});

// GET /api/students/:id
const getStudentById = catchAsync(async (req, res, next) => {
  const student = await studentService.getStudentById(req.params.id);

  if (!student) {
    return res.status(httpStatus.NOT_FOUND).json({
      status: "fail",
      message: "Student not found",
    });
  }

  res.status(httpStatus.OK).json({
    status: "success",
    data: student,
  });
});

// POST /api/students
const createStudent = catchAsync(async (req, res, next) => {
  const student = await studentService.createStudent(req.body);

  res.status(httpStatus.CREATED).json({
    status: "success",
    data: student,
  });
});

// PATCH /api/students/:id
const updateStudent = catchAsync(async (req, res, next) => {
  const student = await studentService.updateStudent(req.params.id, req.body);

  if (!student) {
    return res.status(httpStatus.NOT_FOUND).json({
      status: "fail",
      message: "Student not found",
    });
  }

  res.status(httpStatus.OK).json({
    status: "success",
    data: student,
  });
});

// DELETE /api/students/:id
const deleteStudent = catchAsync(async (req, res, next) => {
  const student = await studentService.deleteStudent(req.params.id);

  if (!student) {
    return res.status(httpStatus.NOT_FOUND).json({
      status: "fail",
      message: "Student not found",
    });
  }

  res.status(httpStatus.NO_CONTENT).json({
    status: "success",
    message: "Student deleted successfully",
  });
});

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
