const { Student } = require("../models");

// Get all students with their class info
const getAllStudents = async () => {
  return await Student.find().populate("class");
};

// Get a single student by ID
const getStudentById = async (id) => {
  return await Student.findById(id).populate("class");
};

// Create a new student
const createStudent = async (data) => {
  return await Student.create(data);
};

// Update an existing student
const updateStudent = async (id, data) => {
  return await Student.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

// Delete a student
const deleteStudent = async (id) => {
  return await Student.findByIdAndDelete(id);
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
