/*
 * This file is used to export all the models in the models folder
 * so that they can be imported from a single file.
 */

import mongoose from "mongoose";

import userSchema from "./User";
import assignmentSchema from "./Assignment";
import courseSchema from "./Course";
import errorSchema from "./Error";
import submissonSchema from "./Submission";

const User = mongoose.model("User", userSchema);
const Course = mongoose.model("Course", courseSchema);
const Assignment = mongoose.model("Assignment", assignmentSchema);
const Submission = mongoose.model("Submission", submissonSchema);
const Error = mongoose.model("Error", errorSchema);

export { User, Course, Assignment, Submission, Error };
