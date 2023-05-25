import mongoose from "mongoose";

// Submission Schema
const submissionSchema = new mongoose.Schema({
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  grade: {
    type: Number,
  },
  file: {
    type: String,
  },
});

export default submissionSchema;