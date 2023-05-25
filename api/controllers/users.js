// Desc: Controller for users

import { Router } from "express";

const router = Router();

/**
 * @route     POST /api/users
 * @desc      Create a new user
 * @access    admin
 * @property  {string} name - Name of the user
 * @property  {string} email - Email of the user
 * @property  {string} password - Password of the user
 * @property  {enum} role - Role of the user
 * @returns   {object}       - id of the new user
 * @returns   {object}       - error message
 * @returns   {int}         - status code 201, 400, 403
 */
router.post("/", (req, res, next) => {
  res.send("Create a new user");
});

/**
 * @route     POST /api/users/login
 * @desc      Login a user
 * @access    All
 * @property  {string} email - Email of the user
 * @property  {string} password - Password of the user
 * @returns   {object} token - JWT token
 * @returns   {object} - error message
 * @returns   {int}   - status code 200, 400, 401, 500
 * @returns   {object} - error message
 */
router.post("/login", (req, res, next) => {
  res.send("Login a user");
});

/**
 * @route     GET /api/users/{id}
 * @desc      Fetch data about a specific user
 * @param     {ObjectId} id - ObjectId of the user
 * @access    Authenticated
 * @returns   {object}    - user data
 * @returns   {object}    - error message
 * @returns   {int}       - status code 200, 403, 404
 */
router.get("/:id", (req, res, next) => {
  res.send(`User ${req.params.id}`);
});

export default router;
