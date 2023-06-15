import mongoose from "mongoose";

// Submission Schema
const submissionSchema = new mongoose.Schema({
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  grade: {
    type: Number,
    required: false,
  },
  file: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "submissions.files"
  },
});

export default submissionSchema;