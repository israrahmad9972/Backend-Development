const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");
const connectDB = require("./config/db");

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("💥 UNCAUGHT EXCEPTION! Shutting down...");
  console.error(err.name, err.message);
  console.error(err.stack);
  process.exit(1);
});

// Connect to DB
connectDB();

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled rejections
process.on("unhandledRejection", (err) => {
  console.error("💥 UNHANDLED REJECTION! Shutting down...");
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Graceful shutdown (for cloud deployments)
process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("💥 Process terminated!");
  });
});
