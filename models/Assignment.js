import mongoose from "mongoose";
import { Submission } from "./index.js";

// Assignment Schema
const assignmentSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  due: {
    type: Date,
    required: true,
  },
  submissions: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    unique: false,
  },
});

export default assignmentSchema;

const Assignment = mongoose.model("Assignment", assignmentSchema);

// Get all submissions for an assignment with pagination
export async function getAllSubmissionsForAssignment(id, page, pageSize = 10) {
  try {
    console.log("page:", page)
    page = parseInt(page);
    pageSize = parseInt(pageSize);

    const assignment = await Assignment.findById(id);

    const totalCount = assignment.submissions.length;
    const totalPages = Math.ceil(totalCount / pageSize);

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const submissions = await Submission.find({ assignmentId: assignment._id }).limit(10).skip((page - 1) * 10);

    console.log(submissions);
    return {
      submissions,
      totalPages,
      currentPage: page,
      pageSize,
      totalCount,
      links: {
        next: page < totalPages ? `/api/assignments/${id}/submissions?page=${page + 1}` : null,
        prev: page > 1 ? `/api/assignments/${id}/submissions?page=${page - 1}` : null,
        last: `/api/assignments/${id}/submissions?page=${Math.ceil(totalPages / 10)}`,
      },
    };
  } catch (err) {
    console.error("  -- error:", err);
    return null;
  }
}

// Fetch the submission for an assignment by the specified student ID
export async function getSubmissionForAssignment(assignmentId, studentId, page) {
  try {
    const submission = await Submission.findOne({
      assignmentId: assignmentId,
      studentId: studentId
    });

    console.log(submission);
    return submission;
  } catch (err) {
    console.error("  -- error:", err);
    return null;
  }
}