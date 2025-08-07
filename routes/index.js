const express = require("express");

// Import routers
const attendanceRouter = require("./attendanceRoutes");
const authRouter = require("./authRoutes");
const classRouter = require("./classRoutes");
const studentRouter = require("./studentRoutes");
const teacherRouter = require("./teacherRoutes");

const router = express.Router();

const routes = [
  { path: "/attendance", route: attendanceRouter },
  { path: "/auth", route: authRouter },
  { path: "/class", route: classRouter },
  { path: "/student", route: studentRouter },
  { path: "/teacher", route: teacherRouter },
];

routes.forEach(({ path, route }) => {
  router.use(path, route);
});

module.exports = router;
