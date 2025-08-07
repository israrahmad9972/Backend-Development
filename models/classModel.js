const mongoose = require('mongoose');

//CREATE A SCHEMA FOR CLASS:
const classSchema = new mongoose.Schema({
  className: {
    type: String,
    required: [true, 'Class must have a name'],
    unique: true
  },
  section: {
    type: String,
    enum: ['A', 'B', 'C', 'D'],
    default: 'A'
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: [true, 'Class must be assigned to a teacher']
  }
});

//CREATE A MODEL FOR THE CLASS:
const Class = mongoose.model('Class', classSchema);
module.exports = Class;
