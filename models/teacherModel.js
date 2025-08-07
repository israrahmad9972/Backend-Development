const mongoose = require('mongoose');
const validator = require('validator');

// CREATE TEACHER SCHEMA
const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Teacher must have a name']
  },
  email: {
    type: String,
    required: [true, 'Teacher must have an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  subject: {
    type: String,
    required: [true, 'Teacher must have a subject']
  },
  phone: {
    type: String,
    required: [true, 'Teacher must have a phone number']
  },
  photo: {
    type: String,
    default: 'default.jpg'
  }
});

// CREATE TEACHER MODEL
const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
