// Desc: Controller for assignments

import { Router } from "express";

const router = Router();

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
router.post("/", (req, res, next) => {
  res.send("Create a new assignment");
});

/**
      @route  GET /api/assignments/{id}
      @desc   Fetch data about a specific assignment
      @param  {ObjectId} id - ObjectId of the assignment
      @access All
      @return {object}    - assignment data
      @return {object}    - error message
      @return {int}       - status code 200, 404
*/
router.get("/:id", (req, res, next) => {
  res.send(`Assignment ${req.params.id}`);
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
  res.send(`Update assignment ${req.params.id}`);
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
  res.send(`Delete assignment ${req.params.id}`);
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