const { Attendance } = require("../models");

const getAllAttendance = async () => {
  return await Attendance.find().populate("student").populate("class");
};

const getAttendanceById = async (id) => {
  return await Attendance.findById(id).populate("student").populate("class");
};

const createAttendance = async (data) => {
  return await Attendance.create(data);
};

const updateAttendance = async (id, data) => {
  return await Attendance.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

const deleteAttendance = async (id) => {
  return await Attendance.findByIdAndDelete(id);
};

module.exports = {
  getAllAttendance,
  getAttendanceById,
  createAttendance,
  updateAttendance,
  deleteAttendance,
};
