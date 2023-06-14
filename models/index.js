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


export async function getStudentsInCourse(courseId) {
  try {
    const course = await Course.findById(courseId).populate("students");
    const students = await User.find({ _id: { $in: course.students } }, { name: 1, email: 1, _id: 1, role: 1 });
    return students;
  } catch (err) {
    console.error("  -- error:", err);
    return null;
  }
}

export async function updateStudentsInCourse(courseId, add, remove) {
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return false;
    }
    if (add) {
      course.students.addToSet(...add);
    }
    if (remove) {
      course.students.pull(...remove);
    }
    await course.save();
    return true;
  } catch (err) {
    console.error("  -- error:", err);
    return false;
  }
}

