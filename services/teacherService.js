const { Teacher } = require("../models");

// Get all teachers
const getAllTeachers = async () => {
  return await Teacher.find();
};

// Get a single teacher by ID
const getTeacherById = async (id) => {
  return await Teacher.findById(id);
};

// Create a new teacher
const createTeacher = async (data) => {
  return await Teacher.create(data);
};

// Update a teacher by ID
const updateTeacher = async (id, data) => {
  return await Teacher.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

// Delete a teacher by ID
const deleteTeacher = async (id) => {
  return await Teacher.findByIdAndDelete(id);
};

module.exports = {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
};
