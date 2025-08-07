const { Class } = require("../models");

// Get all classes
const getAllClasses = async () => {
  return await Class.find();
};

// Get a class by ID
const getClassById = async (id) => {
  return await Class.findById(id);
};

// Create a new class
const createClass = async (data) => {
  return await Class.create(data);
};

// Update an existing class
const updateClass = async (id, data) => {
  return await Class.findByIdAndUpdate(id, data, {
    new: true, // return the updated document
    runValidators: true, // validate before saving
  });
};

// Delete a class
const deleteClass = async (id) => {
  return await Class.findByIdAndDelete(id);
};

module.exports = {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
};
