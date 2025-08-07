const { teacherService } = require("../services");
const { catchAsync } = require("../utils");
const httpStatus = require("http-status-codes");
const APIFeatures = require("../utils/apiFeatures");
const Teacher = require("../models/teacherModel");

// GET /api/teachers
const getAllTeachers = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Teacher.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const teachers = await features.query;

  res.status(httpStatus.OK).json({
    status: "success",
    results: teachers.length,
    data: teachers,
  });
});

// GET /api/teachers/:id
const getTeacher = catchAsync(async (req, res, next) => {
  const teacher = await teacherService.getTeacherById(req.params.id);

  if (!teacher) {
    return res.status(httpStatus.NOT_FOUND).json({
      status: "fail",
      message: "Teacher not found",
    });
  }

  res.status(httpStatus.OK).json({
    status: "success",
    data: teacher,
  });
});

// POST /api/teachers
const createTeacher = catchAsync(async (req, res, next) => {
  const teacher = await teacherService.createTeacher(req.body);

  res.status(httpStatus.CREATED).json({
    status: "success",
    data: teacher,
  });
});

// PATCH /api/teachers/:id
const updateTeacher = catchAsync(async (req, res, next) => {
  const teacher = await teacherService.updateTeacher(req.params.id, req.body);

  if (!teacher) {
    return res.status(httpStatus.NOT_FOUND).json({
      status: "fail",
      message: "Teacher not found",
    });
  }

  res.status(httpStatus.OK).json({
    status: "success",
    data: teacher,
  });
});

// DELETE /api/teachers/:id
const deleteTeacher = catchAsync(async (req, res, next) => {
  const teacher = await teacherService.deleteTeacher(req.params.id);

  if (!teacher) {
    return res.status(httpStatus.NOT_FOUND).json({
      status: "fail",
      message: "Teacher not found",
    });
  }

  res.status(httpStatus.NO_CONTENT).json({
    status: "success",
    message: "Teacher deleted successfully",
  });
});

module.exports = {
  getAllTeachers,
  getTeacher,
  createTeacher,
  updateTeacher,
  deleteTeacher,
};
