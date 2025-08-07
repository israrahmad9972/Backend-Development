const express = require("express");
const rateLimit = require("express-rate-limit");
const { authController } = require("../controllers");

const router = express.Router();

// Rate limiter for login & forgotPassword
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many attempts from this IP, please try again later.",
});

// Apply limiter to sensitive endpoints
router.post("/login", authLimiter, authController.login);
router.post("/forgotPassword", authLimiter, authController.forgotPassword);

// Other routes
router.post("/signup", authController.signup);
router.patch("/resetPassword/:token", authController.resetPassword);

module.exports = router;
