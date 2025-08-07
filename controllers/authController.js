const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const { authService } = require("../services");
const httpStatus = require("http-status-codes");

const signup = catchAsync(async (req, res, next) => {
  const { user, token } = await authService.signup(req.body);

  res.status(httpStatus.CREATED).json({
    status: "success",
    message: "Successfully signed up.",
    token,
    user,
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new AppError("Please provide email and password", httpStatus.BAD_REQUEST)
    );
  }

  const { user, token } = await authService.login(email, password);

  res.status(httpStatus.OK).json({
    status: "success",
    message: "Successfully logged in.",
    token,
    user,
  });
});

const forgotPassword = catchAsync(async (req, res, next) => {
  await authService.forgotPassword(
    req.body.email,
    req.protocol,
    req.get("host")
  );

  res.status(httpStatus.OK).json({
    status: "success",
    message: "Token sent to email!",
  });
});

const resetPassword = catchAsync(async (req, res, next) => {
  const { token } = req.params;
  const { password, passwordConfirm } = req.body;

  const jwtToken = await authService.resetPassword(
    token,
    password,
    passwordConfirm
  );

  res.status(httpStatus.OK).json({
    status: "success",
    message: "Password reset successful",
    token: jwtToken,
  });
});

module.exports = {
  signup,
  login,
  forgotPassword,
  resetPassword,
};
