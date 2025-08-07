const { attendanceService } = require("../services");
const { catchAsync } = require("../utils");
const httpStatus = require("http-status-codes");
const APIFeatures = require("../utils/apiFeatures");
const Attendance = require("../models/attendanceModel");

// GET /api/attendances
const getAllAttendance = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Attendance.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const records = await features.query;

  res.status(httpStatus.OK).send({
    status: "success",
    results: records.length,
    data: records,
  });
});

// GET /api/attendances/:id
const getAttendanceById = catchAsync(async (req, res, next) => {
  const record = await attendanceService.getAttendanceById(req.params.id);
  if (!record) {
    return res
      .status(httpStatus.NOT_FOUND)
      .send({ message: "Attendance not found" });
  }
  res.status(httpStatus.OK).send(record);
});

// POST /api/attendances
const createAttendance = catchAsync(async (req, res, next) => {
  const record = await attendanceService.createAttendance(req.body);
  res.status(httpStatus.CREATED).send(record);
});

// PATCH /api/attendances/:id
const updateAttendance = catchAsync(async (req, res, next) => {
  const record = await attendanceService.updateAttendance(
    req.params.id,
    req.body
  );
  if (!record) {
    return res
      .status(httpStatus.NOT_FOUND)
      .send({ message: "Attendance not found" });
  }
  res.status(httpStatus.OK).send(record);
});

// DELETE /api/attendances/:id
const deleteAttendance = catchAsync(async (req, res, next) => {
  const record = await attendanceService.deleteAttendance(req.params.id);
  if (!record) {
    return res
      .status(httpStatus.NOT_FOUND)
      .send({ message: "Attendance not found" });
  }
  res
    .status(httpStatus.NO_CONTENT)
    .send({ message: "Attendance deleted successfully" });
});

module.exports = {
  getAllAttendance,
  getAttendanceById,
  createAttendance,
  updateAttendance,
  deleteAttendance,
};
