/*
 * This file is used to export all the models in the models folder
 * so that they can be imported from a single file.
 */

import mongoose from "mongoose";

import userSchema from "./User.js";
import assignmentSchema from "./Assignment.js";
import courseSchema from "./Course.js";
import errorSchema from "./Error.js";
import submissonSchema from "./Submission.js";

export const User = mongoose.model("User", userSchema);
export const Course = mongoose.model("Course", courseSchema);
export const Assignment = mongoose.model("Assignment", assignmentSchema);
export const Submission = mongoose.model("Submission", submissonSchema);
export const Error = mongoose.model("Error", errorSchema);
