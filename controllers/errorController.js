const { AppError } = require("../utils");

// Handle invalid MongoDB ID
const handleCastErrorDB = (err) =>
  new AppError(`Invalid ${err.path}: ${err.value}`, 400);

// Handle duplicate field errors (like duplicate email)
const handleDuplicateFieldsDB = (err) => {
  const value = err.keyValue
    ? JSON.stringify(err.keyValue)
    : "Duplicate field value";
  return new AppError(`Duplicate field: ${value}. Use another value!`, 400);
};

// Handle validation errors
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  return new AppError(`Invalid input data: ${errors.join(". ")}`, 400);
};

// Handle JWT errors
const handleJWTError = () =>
  new AppError("Invalid token. Please log in again!", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired. Please log in again.", 401);

// Send detailed error in development
const sendErrorDev = (err, req, res) => {
  console.error("💥 Error:", err);
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

// Send simplified error in production
const sendErrorProd = (err, req, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("💥 UNEXPECTED ERROR:", err);
    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};

// Main error middleware
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  const env = process.env.NODE_ENV || "development";

  if (env === "development") {
    sendErrorDev(err, req, res);
  } else if (env === "production") {
    let error = { ...err };
    error.message = err.message;

    if (err.name === "CastError") error = handleCastErrorDB(err);
    if (err.code === 11000) error = handleDuplicateFieldsDB(err);
    if (err.name === "ValidationError") error = handleValidationErrorDB(err);
    if (err.name === "JsonWebTokenError") error = handleJWTError();
    if (err.name === "TokenExpiredError") error = handleJWTExpiredError();

    sendErrorProd(error, req, res);
  }
};
