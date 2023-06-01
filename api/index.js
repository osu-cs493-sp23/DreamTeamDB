/*
 * This file is the entry point for all API routes.
 * It is responsible for importing all routes and exporting them as a single module.
 * This file is imported in server.js and mounted on the /api path.
 */

import { Router } from "express";
import assignments from "./controllers/assignments.js";
import courses from "./controllers/courses.js";
import users from "./controllers/users.js";

const router = Router();

router.use("/assignments", assignments);
router.use("/courses", courses);
router.use("/users", users);

router.use('*', function (req, res, next) {
  res.status(404).send({
      err: "This URL was not recognized: " + req.originalUrl
  })
})

export default router;
