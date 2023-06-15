/*
 * This file is the entry point for all API routes.
 * It is responsible for importing all routes and exporting them as a single module.
 * This file is imported in server.js and mounted on the /api path.
 */

import { Router } from "express";
import { User, Course } from "../models/index.js";
import assignments from "./controllers/assignments.js";
import courses from "./controllers/courses.js";
import users from "./controllers/users.js";
import { getStudents } from "../models/User.js";

const router = Router();

router.use("/assignments", assignments);
router.use("/courses", courses);
router.use("/users", users);

router.get("/students", async function (req, res, next) {
  const students = await getStudents();
  console.log(students);
  res.status(200).json(students);
});

router.get("/instructors", async (req, res, next) => {
  const instructors = await User.find({ role: "instructor" }).select(
    "name email"
  );
  res.status(200).json(instructors);
});

router.get("/instructors/:id", async (req, res, next) => {
  const { id } = req.params;
  const instructor = await Course.findById(id).select("instructorId");
  const instructorId = instructor.instructorId;
  const instructorInfo = await User.findById(instructorId).select(
    "name email"
  );
  const data = {
    _id: instructorInfo._id,
    name: instructorInfo.name,
    email: instructorInfo.email,
  };
  res.status(200).json(data);
});

router.use('*', function (req, res, next) {
  res.status(404).send({
    err: "This URL was not recognized: " + req.originalUrl
  })
})

export default router;
