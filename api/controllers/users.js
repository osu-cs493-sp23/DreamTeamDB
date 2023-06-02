// Desc: Controller for users

import { Router } from "express";
import { Course, User } from "../../models/index.js";
import { validateLogin, validateUser } from "../../models/User.js";
import { formatError } from "../../lib/utils.js";
import {
  generateAuthToken,
  validateCreateAdminOrInstructor,
  validateRole,
} from "../../lib/auth.js";

import brcypt from "bcrypt";
import { isValidObjectId } from "mongoose";

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
router.post(
  "/",
  validateRole(["admin", "instructor", "student"]),
  validateCreateAdminOrInstructor,
  async (req, res, next) => {
    const { error } = validateUser(req.body);

    if (error) {
      return res.status(400).json({ message: formatError(error) });
    }

    const { email, password } = req.body;

    try {
      const alreadyExists = await User.findOne({ email: email });

      if (alreadyExists) {
        return res.status(400).json({ message: "User already exists." });
      }

      const user = new User({
        ...req.body,
        password: await brcypt.hash(password, 10),
      });

      await user.save();

      res.status(201).json({ id: user._id });
    } catch (e) {
      next(e);
    }
  }
);

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
router.post("/login", async (req, res, next) => {
  const { error } = validateLogin(req.body);

  if (error) {
    return res.status(400).json({ message: formatError(error) });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({ message: "Invalid credentials!" });

    const isMatch = await brcypt.compare(password, user.password);

    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials." });

    const token = generateAuthToken(user);

    res.status(200).json({ token , id: user._id, role: user.role });
  } catch (e) {
    next(e);
  }
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
router.get(
  "/:id",
  validateRole(["student", "instructor", "admin"]),
  async (req, res, next) => {
    if (
      req.params.id !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Forbidden. Insufficient permissions." });
    }

    if (!isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: "User not found." });
    }

    const { role } = req.user;

    try {
      if (role === "student") {
        // const courses = await getCoursesByStudent(req.params.id);
        const student = await User.findById(req.params.id);
        res.status(200).json(student);
      } else if (role === "instructor") {
        // const courses = await getCoursesByInstructor(req.params.id);
        const instructor = await User.findById(req.params.id);
        res.status(200).json(instructor);
      } else {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
      }
    } catch (e) {
      next(e);
    }
  }
);

const getCoursesByInstructor = async (id) => {
  const courses = await Course.find({ instructorId: id }).populate(
    "instructorId",
    "name"
  );

  const courseList = courses.map((course) => ({
    id: course._id,
    name: course.name,
  }));

  return courseList;
};

const getCoursesByStudent = async (id) => {
  return [];
};

export default router;
