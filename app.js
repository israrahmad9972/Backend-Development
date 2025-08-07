const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const globalErrorHandler = require("./controllers/errorController");
const allRoute = require("./routes");

const app = express();

// Middleware
app.use(helmet());
app.use(express.json({ limit: "10kb" }));
app.use(mongoSanitize());
app.use(xss());
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 15 * 60 * 1000,
  message: "Too many requests from this IP, try again later.",
});
app.use("/api", limiter);

// Routes
app.use("/api/v1/", allRoute);

// Handle undefined routes
app.all("*", (req, res, next) => {
  res.status(StatusCodes.NOT_FOUND).json({
    status: ReasonPhrases.NOT_FOUND,
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

// Global error handler
app.use(globalErrorHandler);

module.exports = app;
