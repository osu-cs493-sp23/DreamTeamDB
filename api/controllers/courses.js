// Desc: Controller for courses

import { Router } from "express";

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
router.get("/", (req, res, next) => {
  res.send("Fetch all courses");
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
router.post("/", (req, res, next) => {
  res.send("Create a course");
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
router.get("/:id", (req, res, next) => {
  res.send(`Course ${req.params.id}`);
});

/**
 * @route     PATCH /api/courses/{id}
 * @desc      Update a specific course (excluding assignments, enrolled students)
 * @param     {ObjectId} id - ObjectId of the course
 * @access    admin, instructor
 * @returns   {object}    - error message
 * @returns   {int}       - status code 200, 400, 403, 404
 */
router.patch("/:id", (req, res, next) => {
  res.send(`Update course ${req.params.id}`);
});

/**
 * @route     DELETE /api/courses/{id}
 * @desc      Remove a specific course from the database (including all assignments, enrolled students)
 * @param     {ObjectId} id - ObjectId of the course
 * @access    admin
 * @returns   {object}    - error message
 * @returns   {int}       - status code 204, 403, 404
 */
router.delete("/:id", (req, res, next) => {
  res.send(`Delete course ${req.params.id}`);
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
router.get("/:id/students", (req, res, next) => {
  res.send(`Fetch all students enrolled in course ${req.params.id}`);
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
router.post("/:id/students", (req, res, next) => {
  res.send(`Enroll and/or unenroll students in course ${req.params.id}`);
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
router.get("/:id/roster", (req, res, next) => {
  res.send(`Fetch all students enrolled in course ${req.params.id}`);
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
router.get("/:id/assignments", (req, res, next) => {
  res.send(`Fetch all assignments for course ${req.params.id}`);
});

export default router;
