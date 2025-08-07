const jwt = require("jsonwebtoken");
const { User } = require("../models");
const AppError = require("../utils/AppError");

// Middleware to protect routes
const protect = async (req, res, next) => {
  let token;

  // 1. Get token from Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // 2. If no token found, return unauthorized
  if (!token) {
    return next(new AppError("You are not logged in. Please log in to get access.", 401));
  }

  try {
    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(new AppError("The user belonging to this token no longer exists.", 401));
    }

    // 5. Attach user to request
    req.user = currentUser;
    next();
  } catch (err) {
    // Handle token errors
    if (err.name === "TokenExpiredError") {
      return next(new AppError("Your token has expired. Please log in again.", 401));
    }
    return next(new AppError("Invalid token. Please log in again.", 401));
  }
};

// Middleware to restrict access to certain roles
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("You do not have permission to perform this action.", 403));
    }
    next();
  };
};

module.exports = {
  protect,
  restrictTo,
};
