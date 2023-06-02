// Desc: Controller for assignments

import { Router } from "express";

const router = Router();

import mongoose from "mongoose";

import { assignmentSchema, submissionSchema}  from "../../lib/validation/schemas.js"
import Assignment from "../../models/Assignment.js";

import requireValidation from "../../lib/validation/validation.js";

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
router.post("/", requireValidation(assignmentSchema), (req, res, next) => {
  const assignment = new Assignment(req.body)

  // TODO: validate that coursId belongs to a real course
  // TODO: Authenticate 

  assignment.save().then(async (insertedAssignment) => {
    return res.status(201).json({
      id: insertedAssignment._id,
      links: {
        business: `/api/assignments/${insertedAssignment._id}`
      },
    });
  }).catch(function (e) {
    res.status(400).json({
      error: e
    });
  })

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
router.get("/:id", (req, res, next) => {
  const assignmentID = new mongoose.Types.ObjectId(req.params.id)

  Assignment.findById(assignmentID).then(async (foundAssignment) => {
    if (foundAssignment) {
      const assignment = await Assignment.find({ _id: assignmentID })

      return res.status(200).json({
        assignment: assignment
      });
    } else {
      next()
    }
  }).catch(function (e) {
    console.log(e)
    res.status(400).json({
      error: e
    });
  })
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
router.patch("/:id", requireValidation(assignmentSchema), (req, res, next) => {
  const assignmentId = new mongoose.Types.ObjectId(req.params.id)

  Assignment.findByIdAndUpdate(assignmentId, req.body, { new: true }).then(
    (updatedAssignment) => {
      if (updatedAssignment) {
        res.status(200).json({
          id: updatedAssignment._id,
          links: {
            assignment: `/api/assignment/${updatedAssignment._id}`,
          },
        });
      } else {
        next();
      }
    }
  ).catch(function (e) {
    res.status(400).json({
      error: e
    })
  });
});

/**
 * @route     DELETE /api/assignments/{id}
 * @desc      Remove a specific assignment from the database (including all submissions)
 * @param     {ObjectId} id - ObjectId of the assignment
 * @access    instructor, admin
 * @returns   {int}       - status code 204, 403, 404
 * @returns   {object}       - error message
 */
router.delete("/:id", (req, res, next) => {
  const assignmentID = new mongoose.Types.ObjectId(req.params.id)

  Assignment.deleteOne({ _id: assignmentID }).then(
    (deletedAssignment) => {
      if (deletedAssignment.deletedCount > 0) {
        res.status(204).end()
      } else {
        res.status(400).end()
      }
    }
  ).catch(function (e) {
    res.status(400).json({
      error: e
    })
  });
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
router.get("/:id/submissions", requireValidation(submissionSchema), (req, res, next) => {
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
router.post("/:id/submissions", requireValidation(submissionSchema), (req, res, next) => {
      res.send(`Create a new submission for assignment ${req.params.id}`);
});

export default router;
