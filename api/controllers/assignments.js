// Desc: Controller for assignments

import { Router } from "express";

const router = Router();

import { Assignment, Course } from "../../models/index.js";
import { validateAssignment } from "../../models/Assignment.js";
import {
  validateRole,
} from "../../lib/auth.js";

/**
 * @route     POST /api/assignments
 * @desc      Create a new assignment
 * @access    instructor, admin
 * @property  {ObjectId} courseId  - ObjectId of the course
 * @property  {string} title  - Title of the assignment
 * @property  {int} points   - Total points for the assignment
 * @property  {date} due    - Due date of the assignment
 * @returns   {object}       - id of the new assignment
 * @returns   {object}       - error message
 * @returns   {int}         - status code 201, 400, 403
 */
router.post("/",
  validateRole(["admin", "instructor"]),
  async (req, res, next) => {

    const { error } = validateAssignment(req.body)

    if (error) {
      return res.status(400).json({ message: formatError(error) });
    }

    const validCourse = await Course.findById(req.body.courseId)

    if (!validCourse) {
      return res.status(400).json({ message: "Invalid CourseID." });
    }

    try {
      const assignment = new Assignment(
        req.body
      );

      await assignment.save();

      res.status(201).json({
        id: assignment._id,
        links: {
          "Assignment": '/api/assignments/${assignment._id}'
        }
      });
    } catch (e) {
      next(e);
    }
  });

/**
* @route  GET /api/assignments/{id}
* @desc   Fetch data about a specific assignment
* @param  {ObjectId} id - ObjectId of the assignment
* @access All
* @return {object}    - assignment data
* @return {object}    - error message
* @return {int}       - status code 200, 404
*/
router.get("/:id", async (req, res, next) => {
  try {
    const assignment = await Assignment.findById(req.params.id)

    if (assignment) {
      res.status(201).json({
        assignment
      });
    } else {
      next()
    }
  } catch (e) {
    next(e);
  }
});

/**
 * @route     PATCH /api/assignments/{id}
 * @desc      Update a specific assignment (not including submissions)
 * @param     {ObjectId} id - ObjectId of the assignment
 * @access    instructor, admin
 * @property  {ObjectId} courseId  - ObjectId of the course
 * @property  {string} title  - Title of the assignment
 * @property  {int} points   - Total points for the assignment
 * @property  {date} due    - Due date of the assignment
 * @returns   {object}       - id of the new assignment
 * @returns   {int}       - status code 200, 400, 403, 404
 * @returns   {object}       - error message
 */
router.patch("/:id",
  validateRole(["admin", "instructor"]),
  async (req, res, next) => {

    const { error } = validateAssignment(req.body)

    if (error) {
      return res.status(400).json({ message: formatError(error) });
    }

    const validCourse = await Course.findById(req.body.courseId)

    if (!validCourse) {
      return res.status(400).json({ message: "Invalid CourseID." });
    }

    try {
      const updatedAssignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, { new: true })

      if (updatedAssignment) {
        res.status(200).json({
          id: updatedAssignment._id,
          links: {
            "assignment": `/api/assignment/${updatedAssignment._id}`
          }
        })
      } else {
        next()
      }
    } catch (e) {
      next(e);
    }
  });

/**
 * @route     DELETE /api/assignments/{id}
 * @desc      Remove a specific assignment from the database (including all submissions)
 * @param     {ObjectId} id - ObjectId of the assignment
 * @access    instructor, admin
 * @returns   {int}       - status code 204, 403, 404
 * @returns   {object}       - error message
 */
router.delete("/:id",
  validateRole(["admin", "instructor"]),
  async (req, res, next) => {

    try {
      const deletedAssignment = await Assignment.deleteOne({ _id: req.params.id })

      if (deletedAssignment.deletedCount > 0) {
        res.status(204).end()
      } else {
        res.status(400).end()
      }
    } catch (e) {
      next(e)
    }
  });

/**
 * @route     GET /api/assignments/{id}/submissions
 * @desc      Fetch all submissions for a specific assignment
 * @param     {ObjectId} id - ObjectId of the assignment
 * @param     {int} page - page number (optional)
 * @param     {ObjectId} studentId - ObjectId of the student (optional)
 * @access    instructor, admin
 * @returns   {object - Submissions[]} - array of submissions
 * @returns   {int}       - status code 200, 403, 404
 * @returns   {object}       - error message
 * @paginated
 */
router.get("/:id/submissions", (req, res, next) => {
  res.send(`Get submissions for assignment ${req.params.id}`);
});

/**
 * @route     POST /api/assignments/{id}/submissions
 * @desc      Create a new submission for a specific assignment
 * @param    {ObjectId} id - ObjectId of the assignment
 * @access    student 
 * @type      multipart/form-data
 * @property  {ObjectId} studentId  - ObjectId of the student
 * @property  {ObjectId} assignmentId  - ObjectId of the assignment
 * @property  {string} file   - File to be submitted
 * @property  {date} timestamp    - Timestamp of submission
 * @property  {float} grade    - Grade of submission
 * @returns   {object}       - id of the new submission
 * @returns   {int}       - status code 201, 400, 403, 404
 * @returns   {object}       - error message
 */
router.post("/:id/submissions", (req, res, next) => {
  res.send(`Create a new submission for assignment ${req.params.id}`);
});

export default router;
