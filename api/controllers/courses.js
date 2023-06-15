// Desc: Controller for courses

import { Router } from "express";
import { validateRole } from "../../lib/auth.js";
import requireValidation from "../../lib/validation/validation.js";
import { courseSchema } from "../../lib/validation/schemas.js";
import { createCourse, getAssignmentsForCourse, getCourse, getCourses, updateCourse, deleteCourse } from "../../models/Course.js";
import mongoosee from "mongoose";
import { stringify } from "csv";
import { getStudentsInCourse, updateStudentsInCourse } from "../../models/index.js";

const router = Router();

/**
 * @route     GET /api/courses
 * @desc      Fetch all courses
 * @access    All
 * @param     {int} page - Page number
 * @param     {string} subject - Subject of the course
 * @param     {string} number - Number of the course
 * @param     {string} term - Term of the course
 * @returns   {object Courses[]}  - Array of course objects
 * @returns   {object}    - error message
 * @returns   {int}       - status code 200, 400
 */
router.get("/", async (req, res, next) => {
  const { page, subject, number, term } = req.query;
  const courses = await getCourses(page, subject, number, term);
  if (!courses) {
    return next("Error fetching courses.");
  }
  res.status(200).json(courses);
});

/**
 * @route     POST /api/courses
 * @desc      Create a course
 * @access    admin
 * @param     {string} subject - Subject of the course
 * @param     {string} number - Number of the course
 * @param     {string} term - Term of the course
 * @param     {string} title - Title of the course
 * @param     {ObjectId} instructorId - ObjectId of the instructor
 * @returns   {object}    - id of the new course
 * @returns   {object}    - error message
 * @returns   {int}       - status code 201, 400, 403
 */
router.post("/", validateRole(["admin"]), requireValidation(courseSchema), async (req, res, next) => {
  const {
    instructorId
  } = req.body;
  if (!mongoosee.Types.ObjectId.isValid(instructorId)) {
    return next("Invalid ID");
  }
  const id = await createCourse(req.body);
  if (!id || id.error) {
    return next(id.error || "Error creating course.");
  }
  res.status(201).json({
    id,
    links: {
      getCourse: `/api/courses/${id}`
    },
    course: req.body
  });
});

/**
 * @route     GET /api/courses/{id}
 * @desc      Fetch data about a specific course
 * @param     {ObjectId} id - ObjectId of the course
 * @access    All
 * @returns   {object}    - course data
 * @returns   {object}    - error message
 * @returns   {int}       - status code 200, 404
 */
router.get("/:id", validateRole(["admin", "student", "instructor"]), async (req, res, next) => {
  const { id } = req.params;
  if (!mongoosee.Types.ObjectId.isValid(id)) {
    return next("Invalid ID");
  }
  const course = await getCourse(id);
  if (!course) {
    return next("Error fetching course.");
  }
  res.status(200).json(course);
});

/**
 * @route     PATCH /api/courses/{id}
 * @desc      Update a specific course (excluding assignments, enrolled students)
 * @param     {ObjectId} id - ObjectId of the course
 * @access    admin, instructor
 * @returns   {object}    - error message
 * @returns   {int}       - status code 200, 400, 403, 404
 */
router.patch("/:id", validateRole(["admin", "instructor"]), async (req, res, next) => {
  const { id } = req.params;
  if (!mongoosee.Types.ObjectId.isValid(id)) {
    return next("Invalid ID");
  }
  const didUpdate = await updateCourse(id, req.body);
  if (!didUpdate) {
    return next("Error updating course.");
  }
  res.status(200).end();
});

/**
 * @route     DELETE /api/courses/{id}
 * @desc      Remove a specific course from the database (including all assignments, enrolled students)
 * @param     {ObjectId} id - ObjectId of the course
 * @access    admin
 * @returns   {object}    - error message
 * @returns   {int}       - status code 204, 403, 404
 */
router.delete("/:id", validateRole(["admin"]), async (req, res, next) => {
  const { id } = req.params;
  if (!mongoosee.Types.ObjectId.isValid(id)) {
    return next("Invalid ID");
  }
  const didDelete = await deleteCourse(id);
  if (!didDelete) {
    return next("Error deleting course.");
  }
  res.status(204).end();
});

/**
 * @route     GET /api/courses/{id}/students
 * @desc      Fetch all students enrolled in a specific course
 * @param     {ObjectId} id - ObjectId of the course
 * @access    admin, instructor
 * @returns   {object Student[]}    - array of student objects
 * @returns   {object}    - error message
 * @returns   {int}       - status code 200, 403, 404
 */
router.get("/:id/students", validateRole(["admin", "instructor"]), async (req, res, next) => {
  const { id } = req.params;
  if (!mongoosee.Types.ObjectId.isValid(id)) {
    return next("Invalid ID");
  }
  const students = await getStudentsInCourse(id);
  if (!students) {
    return next("Error fetching students.");
  }
  res.status(200).json({ students });
});

/**
 * @route     POST /api/courses/{id}/students
 * @desc      Enroll and/or unenroll students in a specific course
 * @param     {ObjectId} id - ObjectId of the course
 * @access    admin, instructor
 * @returns   {object}    - error message
 * @param     {ObjectId[]} add - Array of student ObjectId's to enroll
 * @param     {ObjectId[]} remove - Array of student ObjectId's to unenroll
 * @returns   {int}       - status code 200, 400, 403, 404
 * @returns   {object}    - error message
 */
router.post("/:id/students", async (req, res, next) => {
  const { id } = req.params;
  if (!mongoosee.Types.ObjectId.isValid(id)) {
    return next("Invalid ID");
  }
  const { add, remove } = req.body;

  const duplicatesAdd = [...new Set(add)];
  const duplicatesRemove = [...new Set(remove)];

  console.log({ duplicatesAdd, duplicatesRemove })

  const didUpdate = await updateStudentsInCourse(id, duplicatesAdd, duplicatesRemove);
  if (!didUpdate) {
    return next("Error updating students.");
  }
  res.status(200).end();
});

/**
 * @route     GET /api/courses/{id}/roster
 * @desc      Fetch all students enrolled in a specific course (CSV: names, ids, emails)
 * @param     {ObjectId} id - ObjectId of the course
 * @access    admin, instructor
 * @returns   {object}    - error message
 * @returns   {int}       - status code 200, 403, 404
 * @returns   {object}    - CSV file
 * @type     {text/csv}
 */
router.get("/:id/roster", validateRole([["admin", "instructor"]]), async (req, res, next) => {
  const { id } = req.params;
  if (!mongoosee.Types.ObjectId.isValid(id)) {
    return next("Invalid ID");
  }

  const course = await getCourse(id);
  if (!course) {
    return next("Error fetching course.");
  }

  const students = await getStudentsInCourse(id);
  if (!students) {
    return next("Error fetching students.");
  }

  const fields = ["_id", "name", "email"];
  const data = students.map(student => {
    return {
      _id: student._id.toString(),
      name: student.name,
      email: student.email
    };
  });

  res.setHeader("Content-Type", "text/csv");
  res.setHeader('Content-Disposition', 'attachment; filename=\"' + 'download-' + Date.now() + '.csv\"');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Pragma', 'no-cache');

  stringify(data, { header: true }).pipe(res);


});

/**
 * @route     GET /api/courses/{id}/assignments
 * @desc      Fetch all assignments for a specific course
 * @param     {ObjectId} id - ObjectId of the course
 * @access    All?
 * @returns   {object Assignment[]}    - array of assignment objects
 * @returns   {object}    - error message
 * @returns   {int}       - status code 200, 404
 */
router.get("/:id/assignments", async (req, res, next) => {
  const { id } = req.params;
  if (!mongoosee.Types.ObjectId.isValid(id)) {
    return next("Invalid ID");
  }
  const assignments = await getAssignmentsForCourse(id);
  if (!assignments) {
    return next("Error fetching course.");
  }
  res.status(200).json({ assignments });
});

export default router;
