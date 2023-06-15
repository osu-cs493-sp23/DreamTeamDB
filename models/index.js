/*
 * This file is used to export all the models in the models folder
 * so that they can be imported from a single file.
 */

import mongoose from "mongoose";
import fs from "fs";

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
    
    const students = await User.find({ _id: { $in: add } }, { _id: 1 });
    const studentIds = students.map((student) => student._id);

    course.students = course.students.filter((student) => !remove.includes(student.toString()));
    course.students.push(...studentIds);
    await course.save();

    return true;
  } catch (err) {
    console.error("  -- error:", err);
    return false;
  }
}

export async function createSubmission(studentId, assignmentId, file) {
  try {
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return null;
    }
    assignment.submissions.push(studentId);
    await assignment.save();
    const submission = new Submission({
      assignmentId: assignmentId,
      studentId: studentId,
      timestamp: Date.now(),
    });
    // Yeah, we know.
    await submission.save();
    const fileId = await saveSubmissionFile(file, submission._id, studentId, assignmentId);
    submission.file = fileId;
    await submission.save();
    return {
      submissionId: submission._id,
      fileId: fileId,
    }
  } catch (err) {
    console.error("  -- error:", err);
    return null;
  }
}

export async function saveSubmissionFile(file, submissionId, studentId, assignmentId) {
  return new Promise((resolve, reject) => {
    const db = mongoose.connection.db;
    const bucket = new mongoose.mongo.GridFSBucket(db, {
      bucketName: "submissions",
    });
    const metadata = {
      contentType: file.mimetype,
      submissionId: submissionId,
      studentId: studentId,
      assignmentId: assignmentId,
    };
    const uploadStream = bucket.openUploadStream(file.filename, { metadata: metadata });
    const id = uploadStream.id;

    fs.createReadStream(file.path).pipe(uploadStream);

    uploadStream.on("error", function (err) {

      fs.unlink(file.path, function (err) {
        if (err) {
          console.error("  -- error:", err);
        }
      });
      reject(err);
    });

    uploadStream.on("finish", function () {
      fs.unlink(file.path, function (err) {
        if (err) {
          console.error("  -- error:", err);
        }
      });
      resolve(id);
    });
  });
}