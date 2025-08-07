const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Student must have a name"],
  },
  email: {
    type: String,
    required: [true, "Student must have an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  photo: String,
  password: {
    type: String,
    required: [true, "Provide your password"],
    minlength: 6,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords do not match!",
    },
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: [true, "Student must be assigned to a class"],
  },
  role: {
    type: String,
    enum: ["student"],
    default: "student",
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
});

// Hash the password before saving
studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
