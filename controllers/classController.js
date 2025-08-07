const { classService } = require("../services");
const { catchAsync } = require("../utils");
const httpStatus = require("http-status-codes");
const APIFeatures = require("../utils/apiFeatures");
const Class = require("../models/classModel");

const getAllClasses = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Class.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const classes = await features.query;

  res.status(httpStatus.OK).json({
    status: "success",
    results: classes.length,
    data: { classes },
  });
});

const getClassById = catchAsync(async (req, res, next) => {
  const classItem = await classService.getClassById(req.params.id);
  if (!classItem) {
    return res.status(httpStatus.NOT_FOUND).json({
      status: "fail",
      message: "Class not found",
    });
  }

  res.status(httpStatus.OK).json({
    status: "success",
    data: { class: classItem },
  });
});

const createClass = catchAsync(async (req, res, next) => {
  const classItem = await classService.createClass(req.body);

  res.status(httpStatus.CREATED).json({
    status: "success",
    message: "Class created successfully",
    data: { class: classItem },
  });
});

const updateClass = catchAsync(async (req, res, next) => {
  const classItem = await classService.updateClass(req.params.id, req.body);

  if (!classItem) {
    return res.status(httpStatus.NOT_FOUND).json({
      status: "fail",
      message: "Class not found",
    });
  }

  res.status(httpStatus.OK).json({
    status: "success",
    message: "Class updated successfully",
    data: { class: classItem },
  });
});

const deleteClass = catchAsync(async (req, res, next) => {
  const classItem = await classService.deleteClass(req.params.id);

  if (!classItem) {
    return res.status(httpStatus.NOT_FOUND).json({
      status: "fail",
      message: "Class not found",
    });
  }

  res.status(httpStatus.NO_CONTENT).json({
    status: "success",
    message: "Class deleted successfully",
    data: null,
  });
});

module.exports = {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
};
