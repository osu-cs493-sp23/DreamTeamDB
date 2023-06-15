// Desc: Controller for assignments

import { Router } from "express";

const router = Router();

import mongoose from "mongoose";
import joi from "joi";
import { assignmentSchema, submissionSchema } from "../../lib/validation/schemas.js"
import { Assignment, Course, createSubmission, saveSubmissionFile } from "../../models/index.js";
import upload from "../../middleware/multer.js";
import { validateRole } from "../../lib/auth.js";
import { getAllSubmissionsForAssignment, getSubmissionForAssignment } from "../../models/Assignment.js";

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
router.post("/" , async (req, res, next) => {
  const { title, courseId, points, due } = req.body
  const assignment = new Assignment({
    title: title,
    courseId: new mongoose.Types.ObjectId(courseId),
    points: points,
    due: Date.parse(due),
  })

  // TODO: validate that coursId belongs to a real course
  // TODO: Authenticate 
  const course = await Course.findById(new mongoose.Types.ObjectId(courseId))
  if (!course) {
    return res.status(400).json({
      error: "Course does not exist"
    })
  }

  course.assignments.push(assignment._id)
  await course.save()

  assignment.save().then(async (insertedAssignment) => {
    return res.status(201).json({
      id: insertedAssignment._id,
      links: {
        getAssignment: `/api/assignments/${insertedAssignment._id}`
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
router.patch("/:id", (req, res, next) => {
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
router.post("/:id/submissions", validateRole(["student"]), upload, async (req, res, next) => {
  const schema = joi.object({
    // This is the studentId of the user who is logged in
    studentId: req.user._id,
    assignmentId: joi.string().required(),
    file: joi.string()
  })
  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).json({
      error: error.details[0].message
    })
  }

  const assignmentID = new mongoose.Types.ObjectId(req.body.assignmentId);
  const studentID = new mongoose.Types.ObjectId(req.body.studentId);
  const file = req.file

  try {
    const { fileId, submissionId } = await createSubmission(studentID, assignmentID, file)
    return res.status(201).json({
      id: submissionId,
      fileId: fileId,
    })
  } catch (err) {
    next("err in createSubmission")
  }
});

/**
 * @route     GET /api/assignments/{id}/submissions
 * @desc      Fetch the list of all Submissions for an Assignment.
 * @param     {ObjectId} id - ObjectId of the Assignment
 * @access    Only an authenticated User with 'admin' role or an authenticated 'instructor'
 * @returns   {object Submission[]}    - array of submission objects
 * @returns   {object}    - error message
 * @returns   {int}       - status code 200, 404
 */
router.get("/:id/submissions", async (req, res, next) => {

  // const schema = joi.object({
  //   assignmentId: req.assignment._id
  // })

  // const { error } = schema.validate(req.body)
  // if (error) {
  //   return res.status(400).json({
  //     error: error.details[0].message
  //   })
  // }

  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next("Invalid ID");
  }
  const assignmentID = new mongoose.Types.ObjectId(id)
  let page = req.body.page || 1; // Use 1 as the default value if page is not provided

  if (isNaN(page) || !Number.isInteger(page)) {
    page = 1;                     // Set default value if page is not a valid integer
  }
  
  //Fetch a submission only for the specified student ID.
  if (req.body.studentId) {
    if (!mongoose.Types.ObjectId.isValid(req.body.studentId)) {
      return next("Invalid ID");
    }
    const studentId = new mongoose.Types.ObjectId(req.body.studentId)
    const submission = await getSubmissionForAssignment(assignmentID, studentId, page)
    if (!submission) {
      return next("Error fetching submission.");
    }
    res.status(200).json({ submission });
  } else {            //Fetch all submissions only for the specified student ID.
    const submissions = await getAllSubmissionsForAssignment(assignmentID, page);

    if (!submissions) {
      return next("Error fetching submissions.");
    }
    res.status(200).json({ submissions });
  }
});

export default router;
