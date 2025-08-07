const crypto = require("crypto");
const { User } = require("../models");
const { sendEmail } = require("../utils/email");
const { generateToken } = require("../utils/generateToken");
const AppError = require("../utils/AppError");
const httpStatus = require("http-status-codes");

const signup = async (userData) => {
  const user = await User.create(userData);
  const token = generateToken(user._id, user.role);
  return { user, token };
};

const login = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    throw new AppError("Invalid email or password", httpStatus.UNAUTHORIZED);
  }

  const token = generateToken(user._id, user.role);
  return { user, token };
};

const forgotPassword = async (email, protocol, host) => {
  const user = await User.findOne({ email });
  if (!user)
    throw new AppError("No user with this email", httpStatus.NOT_FOUND);

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${protocol}://${host}/api/v1/auth/resetPassword/${resetToken}`;
  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetUrl}.\nIf you didn’t forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for 10 minutes)",
      message,
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    throw new AppError(
      "There was an error sending the email. Try again later."
    );
  }
};

const resetPassword = async (token, password, passwordConfirm) => {
  if (!password || !passwordConfirm) {
    throw new AppError("Please provide password and passwordConfirm", 400);
  }

  if (password !== passwordConfirm) {
    throw new AppError("Passwords do not match", 400);
  }

  const hashed = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashed,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new AppError(
      "Token is invalid or has expired",
      httpStatus.BAD_REQUEST
    );
  }

  user.password = password;
  user.passwordConfirm = passwordConfirm;
  user.passwordChangedAt = Date.now();
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  const jwtToken = generateToken(user._id, user.role);
  return jwtToken;
};

module.exports = {
  signup,
  login,
  forgotPassword,
  resetPassword,
};
