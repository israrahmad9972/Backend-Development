const jwt = require("jsonwebtoken");

/**
 * Generate a JWT token for authentication.
 * @param {String} id - User ID
 * @param {String} role - User role (e.g., 'admin', 'teacher')
 * @returns {String} Signed JWT token
 */
const generateToken = (id, role) => {
  if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRES_IN) {
    throw new Error("JWT_SECRET or JWT_EXPIRES_IN is missing in .env");
  }

  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

module.exports = { generateToken };
